import Styles from './styles.module.css';

interface ButtonProps{
    link?:string;
    text?:string;
    onClick?:()=>void;
}
const Button:React.FC<ButtonProps> = ({link="#",text="button",onClick}) => {
  return (
    <div className={Styles.container} onClick={onClick}>
    <div className={Styles.btn}><a href={link}>{text}</a></div>
    </div>
  )
}

export default Button
