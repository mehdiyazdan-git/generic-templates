import styled from "styled-components";
import React from "react";

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    
    .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
    }
    
    .username {
        font-size: 16px;
        font-weight: bold;
        margin-right: 10px;
        
        &:hover {
            text-decoration: underline;
        }
    }
    
    .logout {
        font-size: 16px;
        
        &:hover {
            text-decoration: underline;
        }
    }
`;
const UserDropdown = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    
    .dropdown-item {
        padding: 5px 10px;
        cursor: pointer;
        
        &:hover {
            background-color: #f0f0f0;
        }
    }
`;

const UserDropdownButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    
    &:hover {
        color: #000;
    }
`;

const UserDropdownToggle = ({ onToggle, isOpen }) => {
    function handleLogout() {
        // logout logic
    }

    return (
        <UserDropdownButton onClick={onToggle}>
            <img src={"user.avatar"} alt={"user.username"} className="avatar"/>
            <span className="username">{"user.username"}</span>
            {isOpen ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}

            <UserDropdown isOpen={isOpen}>
                <div className="dropdown-item">Profile</div>
                <div className="dropdown-item">Settings</div>
                <div className="dropdown-item">Logout</div>

                <UserInfo>
                    <img src={"user.avatar"} alt={"user.username"} className="avatar"/>
                    <span className="username">{"user.username"}</span>
                    <button className="logout" onClick={handleLogout}>Logout</button>
                </UserInfo>
            </UserDropdown>
        </UserDropdownButton>
    );
}
export { UserDropdownToggle };
