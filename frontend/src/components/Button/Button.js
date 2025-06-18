import PropTypes from 'prop-types';
import classes from "./button.module.css";

export default function Button({
    type,
    onClick,
    color,
    backgroundColor,
    fontSize,
    width,
    height,
    children,
    text
}) {
    return (
        <div className={classes.container}>
            <button 
                type={type} 
                className={classes.button}
                style={{
                    color,
                    backgroundColor,
                    fontSize,
                    width,
                    height
                }} 
                onClick={onClick}
            >
                {text} 
            </button>
        </div>
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    children: PropTypes.node,
    text: PropTypes.string
};

Button.defaultProps = {
    type: "button",
    onClick: () => {},
    color: "#fff",
    backgroundColor: "#e7292e",
    fontSize: "1rem",
    width: "10rem",
    height: "20rem"
};