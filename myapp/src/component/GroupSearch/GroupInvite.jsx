import React, { useState } from "react";
import { inviteToGroup } from "../../api";

function GroupInvite() {
  const [groupId, setGroupId] = useState("");
  const [email, setEmail] = useState("");
  const handleInvite = async () => {
    await inviteToGroup({ groupId, email });
    alert("Invitation sent!");
    setEmail("");
  };
  return (
    <div>
      <input value={groupId} onChange={e => setGroupId(e.target.value)} placeholder="Group ID" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Invitee Email" />
      <button onClick={handleInvite}>Invite</button>
    </div>
  );
}

export default GroupInvite;