'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from "./components/Input";
import Button from "./components/Button";

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setEmail(rememberedEmail);
            setRememberMe(true);
        }
    }, []);

    const validateForm = () => {
        if (!email.trim() && !password.trim()) {
            setError('Please enter both email and password.');
            return false;
        } else if (!email.trim()) {
            setError('Please enter your email.');
            return false;
        } else if (!password.trim()) {
            setError('Please enter your password.');
            return false;
        }
        setError('');
        return true;
    }

    const handleSubmit = async (event: any) => {
        console.log(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/auth/login`);

        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_LINK}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            })
            if (res.ok) {
                const data = await res.json()
                document.cookie = `token=${data.accessToken}; path=/;`;
                localStorage.setItem('userID', data.id)

                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }

                console.log('Login Successful')
                if (data.total > 0) {
                    router.push('/movielist')
                } else {
                    router.push('/empty')
                }
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Login Failed')
            }
        } catch (error) {
            console.log('error during login:', error)
            setError('An error occurred. Please try again.')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={`flex items-center justify-center mt-12 ${isLoading ? 'cursor-wait' : ''}`}>
            <div className="rounded-lg w-[380px] sm:w-[300px] h-[336px] sm:h-[360px] max-w-sm">
                <h2 className="text-6xl font-semibold mb-8 text-center text-white">Sign in</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error}
                        className="focus:border-custom-border focus:border-2 focus:outline-none"
                    />
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error}
                        className="focus:border-custom-border focus:border-2 focus:outline-none"
                    />
                    <div className="flex items-center justify-center mb-6">
                        <label className="flex items-center text-white">
                            <input
                                type="checkbox"
                                className="custom-checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="ml-2 font-light">Remember me</span>
                        </label>
                    </div>
                    <Button
                        text="Login"
                        type="submit"
                        loading={isLoading}
                    />
                </form>
            </div>
        </div>
    );
}