import Input from "./components/Input";
import LoginButton from "./components/Button";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="p-8 rounded-lg  w-full max-w-sm">
                <h2 className="text-6xl  mb-8 text-center text-white">Sign in</h2>
                <form>
                    <Input label="Email" type="email" id="email" />
                    <Input label="Password" type="password" id="password" />
                    <div className="flex items-center justify-center mb-6">
                        <label className="flex items-center text-white">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 font-light">Remember me</span>
                        </label>
                    </div>
                    <LoginButton text="Login" type="submit" />
                </form>
            </div>
        </div>
    );
}
