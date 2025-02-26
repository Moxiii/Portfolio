import {JSX, useState} from "react";
import ProjectManager from "../ProjectManager.tsx"
import {useNavigate} from "react-router-dom";
import "./Admin.scss"
export default function Admin():JSX.Element{
    const navigate = useNavigate();
    const [isAuth , setIsAuth] = useState(false)
    const [pass , setPass] = useState("")
    const ADMIN_PASS = "TodoADDEnv";
    const handleLogin = (e: React.FormEvent)=>{
        e.preventDefault();
        if(pass === ADMIN_PASS){
            setIsAuth(true)
        }else{
            navigate("/")
        }
    }
    return (
        <div className="admin-container">
            {!isAuth ? (
                <form onSubmit={handleLogin} className="password-form">
                    <h2>🔒 Admin Panel</h2>
                    <input
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Entrez le mot de passe"
                        required
                    />
                    <button type="submit">Se connecter</button>
                </form>
            ) : (
                <ProjectManager/>
            )}
        </div>
    )
}