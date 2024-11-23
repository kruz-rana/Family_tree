import React, { useState, useEffect } from "react";
import { fetchRootMembers } from "../api";
import PersonDetails from "./PersonDetails";
import AddPerson from "./AddPerson";

const FamilyTree = () => {
    const [members, setMembers] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const refresh = () => fetchRootMembers().then((response) => setMembers(response.data));

    useEffect(() => {
        refresh();
    }, []);

    return (
        <div className="container py-5">
            <h1 className="text-center text-primary mb-4">Family Tree</h1>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <AddPerson refresh={refresh} />
                </div>
                <div className="col-md-6">
                    <h2 className="text-secondary">Root Members</h2>
                    <ul className="list-group">
                        {members.map((member) => (
                            <li
                                key={member._id}
                                className={`list-group-item list-group-item-action ${selectedPerson === member._id ? "active" : ""
                                    }`}
                                onClick={() => setSelectedPerson(member._id)}
                            >
                                {member.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {selectedPerson && (
                <div className="mt-4">
                    <PersonDetails personId={selectedPerson} refresh={refresh} />
                </div>
            )}
        </div>
    );
};

export default FamilyTree;
