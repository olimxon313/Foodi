import './menu.scss';

const Menu = () => {
  const menuItems = [
    { title: "Naan Burger", price: "$1.85", description: "Delicious Indian naan with burger fillings.", id: 1, cotegory: "Bread", path :"/images/burger-1.png" },
    { title: "Butter Chicken Taco", price: "$1.15", description: "Classic taco with a butter chicken twist.", id: 2, cotegory: "Rolls", path :"/images/burger-2.png" },   
    { title: "Chicken Burger", price: "$2.00", description: "Juicy chicken burger with fresh toppings.", id: 3, cotegory: "Donut", path :"/images/burger-5.png"},
    { title: "Cheese Chicken Naan", price: "$2.50", description: "Naan stuffed with cheese and chicken.", id: 4, cotegory: "Pastry", path :"/images/burger-6.png"},
    { title: "3 Layer Burger", price: "$4.99", description: "Triple-layer burger for the big appetite.", id: 5, cotegory: "Cakes" , path :"/images/burger-4.png"},
    { title: "Sandwich", price: "$2.80", description: "Fresh sandwich with veggies and sauces.", id: 6, cotegory: "Cookies", path :"/images/burger-3.png" },
  ];

  return (
    <div className="menu">
      <h2>Our Best & Delicious Menu</h2>
      <div className="tabs">
        {["All", "Bread", "Rolls", "Donut", "Pastry", "Cakes", "Cookies"].map((tab, index) => (
          <button key={index} className={index === 0 ? "active" : ""}>
            {tab}
          </button>
        ))}
      </div>
      <div className="grid">
        {menuItems.map((item) => (
          <div key={item.id} className="card">
            <div className="image">
            <img src={item.path}  />
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="footer">
              <span>{item.price}</span>
              <button className="cart">🛒</button>
            </div>
          </div>
        ))}
      </div>
      <button className="see-all">See All</button>
    </div>
  );
};

export default Menu;
