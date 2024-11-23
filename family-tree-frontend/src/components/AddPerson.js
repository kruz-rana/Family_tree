import React, { useState, useEffect } from "react";
import { fetchRootMembers, addPerson } from "../api";

const AddPerson = ({ refresh }) => {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [photo, setPhoto] = useState(null);
    const [parentId, setParentId] = useState("");
    const [parents, setParents] = useState([]);

    useEffect(() => {
        fetchRootMembers().then((response) => setParents(response.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("dob", dob);
        formData.append("photo", photo);
        formData.append("parentId", parentId);

        await addPerson(formData);
        refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 shadow-lg rounded bg-light">
            <h3 className="text-primary mb-4">Add Family Member</h3>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
            </div>
            <div className="mb-3">
                <select
                    className="form-select"
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                >
                    <option value="">No Parent</option>
                    {parents.map((parent) => (
                        <option key={parent._id} value={parent._id}>
                            {parent.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
                Add
            </button>
        </form>
    );
};

export default AddPerson;
