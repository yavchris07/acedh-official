import Login from "../../components/login";
import logo from '../../assets/ACEDH.png'

const AuthPage = () => {
  return (
    <div className="bg-zinc-50 grid grid-cols-2 w-screen h-screen md:flex-row font-montserrat">
      <div className="bg-zinc-300 flex flex-col items-center justify-center">
        <img
          src={logo}
          width={220}
          height={220}
          alt="logo"
          loading="lazy"
          className="w-80 h-80 object-cover"
        />
        <h3 className="text-green-700">ACEDH RDC</h3>
      </div>
      <Login />
    </div>
  )
}

export default AuthPage
