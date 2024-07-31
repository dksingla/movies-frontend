import Input from "./components/Input";
import LoginButton from "./components/Button";

export default function Home() {
    return (
        <div className="flex  items-center justify-center mt-13  ">
            <div className=" rounded-lg w-[380px] sm:w-[300px] h-[336px] sm:h-[360px] max-w-sm">
                <h2 className="text-6xl font-semibold  mb-8 text-center text-white">Sign in</h2>
                <form>
                    <Input label="Email" type="email" id="email" className="focus:border-custom-border focus:border-2  focus:outline-none" />
                    <Input label="Password" type="password" id="password" className="focus:border-custom-border focus:border-2  focus:outline-none"/>
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
