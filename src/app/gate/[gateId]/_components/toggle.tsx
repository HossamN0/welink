
function GateToggle({ role, setRole }: { role: string, setRole: React.Dispatch<React.SetStateAction<'subscriber' | 'visitor'>> }) {

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setRole('subscriber')
        } else {
            setRole('visitor')
        }
    }

    return (
        <label
            htmlFor="filter"
            className="select-none relative isolate grid grid-cols-2 cursor-pointer rounded-full text-black font-medium text-[16px] w-60"
        >
            <input
                id="filter"
                type="checkbox"
                className="peer absolute w-px h-px -m-px overflow-hidden whitespace-nowrap border-0 p-0"
                onChange={handleToggle}
            />

            <span
                className="pointer-events-none absolute inset-0 rounded-full bg-cyan-200 after:absolute after:inset-[4px] after:rounded-full after:bg-cyan-950 after:transition-all after:duration-500 after:ease-[cubic-bezier(0.47,1.64,0.41,0.8)] peer-checked:after:left-1/2 after:left-[5px] after:right-1/2 peer-checked:after:right-[5px]"
            />

            <span className={`relative z-10 grid place-content-center px-8 py-4 opacity-75 transition-opacity duration-300 ease-in-out delay-150 peer-checked:opacity-100 ${role === 'visitor' ? 'text-white' : ''}`}>
                Visitor
            </span>
            <span className={`relative z-10 grid place-content-center px-8 py-4 opacity-100 transition-opacity duration-300 ease-in-out delay-150 peer-checked:opacity-75 ${role === 'subscriber' ? 'text-white' : ''}`}>
                Subscriber
            </span>
        </label>
    )
}

export default GateToggle
