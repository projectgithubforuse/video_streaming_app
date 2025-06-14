/**import React, { useState } from "react";
import { createGroup } from "../../api";

function GroupCreate() {
  const [name, setName] = useState("");
  const handleCreate = async () => {
    await createGroup({ name });
    alert("Group created!");
    setName("");
  };
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Group name" />
      <button onClick={handleCreate}>Create Group</button>
    </div>
  );
}

export default GroupCreate;**/
import React, { useState } from "react";
import { createGroup } from "../../api";

function GroupCreate() {
  const [name, setName] = useState("");
  const [members, setMembers] = useState(""); // comma-separated user IDs
  const [invited, setInvited] = useState(""); // comma-separated emails

  const handleCreate = async () => {
    const membersArr = members.split(",").map(id => id.trim()).filter(Boolean);
    const invitedArr = invited.split(",").map(email => email.trim()).filter(Boolean);
    try {
      await createGroup({ name, members: membersArr, invited: invitedArr });
      alert("Group created!");
      setName("");
      setMembers("");
      setInvited("");
    } catch (err) {
      alert("Failed to create group");
    }
  };

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Group name" />
      <input value={members} onChange={e => setMembers(e.target.value)} placeholder="User IDs (comma separated)" />
      <input value={invited} onChange={e => setInvited(e.target.value)} placeholder="Invite emails (comma separated)" />
      <button onClick={handleCreate}>Create Group</button>
    </div>
  );
}

export default GroupCreate;