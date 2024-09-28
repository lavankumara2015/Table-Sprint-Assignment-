import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import React, { useEffect, useState } from "react";
import SubCategory from "../Subcategory";

function DashBoard() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
    }
    handleButtonClick("btn1 content");
  }, [navigate]);


  const handleProfile = () => {
    setIsDialogOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsDialogOpen(false);
    navigate("/");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleButtonClick = (content) => {
    setSelectedContent(content);
  };

  return (
    <div>
      <div className="dashBoard-mainContainer">
        <div className="dashBoard-mainContainer__inner">
          <div>
            <img
              src="./assets/Group 1000004703.png"
              style={{ position: "relative", bottom: "0.05rem" }}
              alt="Icon"
            />
            &nbsp;
            <img src="./assets/TableSprint.png" alt="TableSprint logo" />
          </div>
          <div>
            <img
              src="./assets/Group 2609118.png"
              onClick={handleProfile}
              alt="Profile Icon"
            />
          </div>
        </div>
        <div className="dashBoard-section">
          <div className="dashBoard-section__leftSide">
            <button
              style={{
                backgroundColor:
                  selectedContent === "btn1 content"
                    ? "#f4edaf"
                    : "transparent",
              }}
              onClick={() => handleButtonClick("btn1 content")}
            >
              <img src="./assets/home (3) 1.png" />
              <p>Dashboard</p>
            </button>
            <button
              style={{
                backgroundColor:
                  selectedContent === "btn2 content"
                    ? "#f4edaf"
                    : "transparent",
              }}
              onClick={() => handleButtonClick("btn2 content")}
            >
              <img src="./assets/cate.png" />
              <p>Category</p>
            </button>
            <button
              style={{
                backgroundColor:
                  selectedContent === "btn3 content"
                    ? "#f4edaf"
                    : "transparent",
              }}
              onClick={() => handleButtonClick("btn3 content")}
            >
              <img src="./assets/subcat.png" />
              <p>Subcategory</p>
            </button>
            <button
              style={{
                backgroundColor:
                  selectedContent === "btn4 content"
                    ? "#f4edaf"
                    : "transparent",
              }}
              onClick={() => handleButtonClick("btn4 content")}
            >
              <img src="./assets/product.png" />
              <p>Products</p>
            </button>
          </div>
          <div className="dashBoard-section__RightSide">
            {selectedContent === "btn1 content" && (
              <div className="dashBoard-section__Dashboard">
                <img src="./assets/869311531ee26032e175620e2d0b5059.png" />
                <p>Welcome to TableSprint admin</p>
              </div>
            )}
            {selectedContent === "btn2 content" && (
              <div>
                <SubCategory content={"Category"} icon={"./assets/cate.png"} />
              </div>
            )}
            {selectedContent === "btn3 content" && (
              <p>
                <SubCategory
                  content={"Subcategory"}
                  icon={"./assets/subcat.png"}
                />
              </p>
            )}
            {selectedContent === "btn4 content" && (
              <p>
                <SubCategory icon={"./assets/cate.png"} 
                content={"Products"} />
              </p>
            )}
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <dialog open className="logout-dialog" onClick={handleCloseDialog}>
          <div className="dialog-content">
            <h4>Log out</h4>
            <h5>Are you sure you want to log out?</h5>
            <button
              onClick={handleLogout}
              style={{ backgroundColor: "#662671", color: "white" }}
            >
              Logout
            </button>
            <button onClick={handleCloseDialog}>Cancel</button>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default DashBoard;
