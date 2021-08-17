import React from 'react'

export const Footer = () => {
    let footerStyle = {
        position: "relative",
    top: "100%",
    width: "100%",
    padding : "3px"
    }
    return (
        <footer className="bg-dark text-light" style={footerStyle}>
        <p className="text-center">Copyright &copy; MyTodoList.com</p>
        </footer>
    )
}
