import React, { useState } from "react";
import { addMemberToGroup } from "../../api";

function GroupAddMember() {
  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");
  const handleAdd = async () => {
    await addMemberToGroup({ groupId, userId });
    alert("Member added!");
    setUserId("");
  };
  return (
    <div>
      <input value={groupId} onChange={e => setGroupId(e.target.value)} placeholder="Group ID" />
      <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="User ID" />
      <button onClick={handleAdd}>Add Member</button>
    </div>
  );
}

export default GroupAddMember;