import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleNewFriend(newFriend) {
    setFriends((friend) => [...friend, newFriend]);
    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <Friends friends={friends} />
        {showAddFriend && <FormAddFriend onAddNewFriend={handleNewFriend} />}
        <Button onShowAddFriend={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function Friends({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friends={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friends }) {
  return (
    <li>
      <img src={friends.image} alt="friend" />
      <h3>{friends.name}</h3>
      {friends.balance < 0 && (
        <p className="red">
          You owe {friends.name} ${Math.abs(friends.balance)}
        </p>
      )}
      {friends.balance === 0 && <p>you and {friends.name} are even</p>}
      {friends.balance > 0 && (
        <p className="green">
          {friends.name} owes you ${Math.abs(friends.balance)}
        </p>
      )}
      <Button>Select</Button>
    </li>
  );
}

function Button({ children, onShowAddFriend }) {
  return (
    <button className="button" onClick={onShowAddFriend}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddNewFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();

    const newFriend = {
      name,
      id,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);

    onAddNewFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <label>👨🏽‍🤝‍👨🏻 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🖼 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>👨 Your expense</label>
      <input type="text" />

      <label>👨🏽‍🤝‍👨🏻 X's expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
