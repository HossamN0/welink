import Form from "./_components/form"

function LoginPage() {
    return (
        <main className="min-h-screen w-full relative bg-black z-[1] py-[100px]">
            <div
                className="absolute inset-0 -z-[1]"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
                }}
            />
            <div className="content-container flex-center flex-col">
                <h1 className="text-3xl text-center mb-22 font-bold">Welcome back</h1>
                <Form />
            </div>
        </main>
    )
}

export default LoginPage
