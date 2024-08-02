'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from "./components/Input";
import LoginButton from "./components/Button";

export default function Home() {
    const [email, setEmail] =useState('')
    const [password , setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter();

    const handleSubmit = async (event: any) => {
     event.preventDefault();
     try{
        const res = await  fetch('http://localhost:3000/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({email,password})
        })
        if(res.ok){
            const data = await res.json()
            console.log("data is:",data)
            localStorage.setItem('token',data.access_token)
            localStorage.setItem('userID',data.id)

            console.log('Login Succesfull')
            if(data.total >0){
                router.push('/movielist')
            }else{
            router.push('/empty')

            
            }
        } else{
            const errorData = await res.json();
            setError(errorData.message || 'Login Failed')
        }
    }catch(error){
        console.log('error during login:',error)
        setError('an error occured please try again ')
    }

    }
    return (
        <div className="flex  items-center justify-center mt-13  ">
            <div className=" rounded-lg w-[380px] sm:w-[300px] h-[336px] sm:h-[360px] max-w-sm">
                <h2 className="text-6xl font-semibold  mb-8 text-center text-white">Sign in</h2>
                <form onSubmit={handleSubmit}>
                    <Input 
                    label="Email" 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error} 
                    className="focus:border-custom-border focus:border-2  focus:outline-none" />
                    
                    <Input 
                    label="Password" 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error}
                    className="focus:border-custom-border focus:border-2  focus:outline-none"/>
                    <div className="flex items-center justify-center mb-6">
                        <label className="flex items-center text-white">
                            <input type="checkbox" className="custom-checkbox" />
                            <span className="ml-2 font-light">Remember me</span>
                        </label>
                    </div>
                    <LoginButton text="Login" type="submit" />
                </form>
            </div>
        </div>
    );
}
