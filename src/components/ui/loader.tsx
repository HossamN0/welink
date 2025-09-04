function Loader({ color = 'border-white/20' }: { color?: string }) {
    return (
        <div className={`w-5 h-5 rounded-full border-[3px] ${color} border-t-transparent animate-[spin_1.2s_linear_infinite]`}></div>
    )
}

export default Loader