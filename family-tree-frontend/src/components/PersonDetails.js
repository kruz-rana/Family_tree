import React, { useEffect, useState } from "react";
import { fetchPersonDetails, deletePerson } from "../api";

const PersonDetails = ({ personId, refresh }) => {
    const [person, setPerson] = useState(null);

    useEffect(() => {
        fetchPersonDetails(personId).then((response) => setPerson(response.data));
    }, [personId]);

    const handleDelete = async () => {
        await deletePerson(personId);
        refresh();
    };

    if (!person) return <p>Loading...</p>;

    return (
        <div className="card shadow-lg p-4">
            <div className="d-flex align-items-center mb-3">
                {person.photo && (
                    <img
                        src={`http://localhost:3005/uploads/${person.photo}`}
                        alt={person.name}
                        width="100"
                        className="me-3 rounded-circle"
                    />
                )}
                <div>
                    <h2 className="text-primary">{person.name}</h2>
                    <p>Date of Birth: {new Date(person.dob).toLocaleDateString()}</p>
                </div>
            </div>
            <button
                className="btn btn-danger mb-3"
                onClick={handleDelete}
            >
                Delete
            </button>
            {person.children.length > 0 && (
                <div>
                    <h3 className="text-secondary">Children:</h3>
                    <ul className="list-group">
                        {person.children.map((child) => (
                            <li key={child._id} className="list-group-item">
                                {child.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PersonDetails;
