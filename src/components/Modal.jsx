export default function Modal({onClose, onDelete}) {
    return(
        <div className="w-full h-screen bg-[rgb(0,0,0,0.6)] fixed top-0 left-0 z-10">
            <div className="p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[400px]">
                <div className="bg-white p-3 rounded w-full">
                    <p className="text-xl font-mono text-center">Are You Sure to Delete This Permanently</p>

                    <div className="flex justify-center mt-5">
                        <button onClick={onDelete} className="rounded mx-1 py-2 px-4 bg-red-600 text-white">
                            yes
                            </button>
                        <button onClick={onClose} className="rounded mx-1 py-2 px-4 bg-green-600 text-white">
                            cancel
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}