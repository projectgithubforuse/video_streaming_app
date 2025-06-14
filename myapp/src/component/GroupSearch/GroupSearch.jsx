// GroupSearch.jsx
import React, { useState } from "react";
import { searchGroups } from "../../api";

function GroupSearch() {
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState([]);

  const handleSearch = async () => {
    const { data } = await searchGroups(query);
    setGroups(data);
  };

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search groups..." />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {groups.map(g => <li key={g._id}>{g.name}</li>)}
      </ul>
    </div>
  );
}

export default GroupSearch;