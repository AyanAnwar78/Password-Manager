import React, { useEffect, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
function Home() {
    const [data, setData] = useState({ siteURL: "", username: "", password: "" });

    const [passArray, setPassArray] = useState([]);

    const [editId, setEditId] = useState(null);


    const getPasswords = async () => {
        try {
            const req = await fetch("http://localhost:3000/");
            const passwords = await req.json();
            setPassArray(passwords);
        } catch (error) {
            console.error("Error fetching passwords:", error);
            toast.error("Failed to fetch passwords");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => (
            {
                ...prev, [name]: value
            }
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.siteURL === "" || data.username === "" || data.password === "") {
            toast.error("All fields are required!");
            return;
        }

        try {
            const method = editId ? "PUT" : "POST";

            await fetch("http://localhost:3000/", {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editId ? { ...data, id: editId } : data),
            });

            toast.success(editId ? "Updated successfully!" : "Saved successfully!");

            setData({ siteURL: "", username: "", password: "" });
            setEditId(null);
            getPasswords();

        } catch (error) {
            toast.error("Error saving password");
        }
    };


    const handleEdit = (item) => {
        setData({
            siteURL: item.siteURL,
            username: item.username,
            password: item.password
        });
        setEditId(item.id);
    };


    const handleDelete = async (id) => {
        try {
            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });

            toast.success("Deleted successfully!");
            getPasswords();
        } catch (error) {
            toast.error("Error deleting password");
        }
    };



    useEffect(() => {
        getPasswords()
    }, [])

    return (
        <div className='flex flex-col w-full items-center mt-10'>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="dark"
                transition={Bounce}
            />

            <section className='w-150'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input className='border rounded-3xl h-12 px-6 my-2' type="text" name="siteURL" value={data.siteURL} onChange={handleChange} placeholder='https://www.google.com' />
                    <div className='flex gap-2'>
                        <input className='border w-1/2 rounded-3xl h-12 px-6 my-2' type="text" name="username" value={data.username} onChange={handleChange} placeholder='Username' />
                        <input className='border w-1/2 rounded-3xl h-12 px-6 my-2' type="password" name="password" value={data.password} onChange={handleChange} placeholder='Password' />
                    </div>
                    <button className='border py-3 rounded-3xl bg-black text-white mt-2'>Save</button>
                </form>
            </section>

            <section className="w-full flex justify-center mt-10">
                <table className="w-[60%] border border-gray-400 text-center">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="py-2 border">Site URL</th>
                            <th className="py-2 border">Username</th>
                            <th className="py-2 border">Password</th>
                            <th className="py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passArray.length === 0 && (
                            <tr>
                                <td colSpan="4" className="py-4">No Data to Display</td>
                            </tr>
                        )}
                        {passArray.map((item, index) => (
                            <tr key={index}>
                                <td className="border py-2"><a href={item.siteURL}>{item.siteURL}</a></td>
                                <td className="border py-2">{item.username}</td>
                                <td className="border py-2">{"* ".repeat(item.password.length)}</td>
                                <td className="border py-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 mx-1 rounded"
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="bg-red-500 text-white px-3 py-1 mx-1 rounded"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>


        </div>
    )
}

export default Home                           