import React from "react";
import styles from "./Button.module.css";

type ButtonColor = "primary" | "secondary" | "danger" | "info";

interface ButtonProps extends React.ButtonHTMLAttributes <HTMLButtonElement> {
  //onClick: () => void;
  color?: ButtonColor; 
  children: React.ReactNode; 
}

const Button = ({ color = "primary", children, ...props }: ButtonProps) => {
  const colorClass = styles[color] || styles.primary;

  return (
    <button className={`${styles.button} ${colorClass}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
