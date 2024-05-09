import cloudlic from "../../assets/cloudilic_logo.jpeg";
import ListIcon from "@mui/icons-material/List";

const Header = ({ visible, setVisible }) => {
  const menuVisible = () => {
    setVisible(!visible);
  };
  return (
    <div className=" h-[80px] flex items-center bg-[#F8F9FC]">
      <div className="max-lg:w-[40%] w-[20%] flex justify-between items-center hover:bg-gray-100 cursor-pointer h-full">
        <img
          src={cloudlic}
          width={45}
          height={45}
          alt="cloudlic"
          className=" ml-2"
        />
        <div className="sm:hidden cursor-pointer mr-3" onClick={menuVisible}>
          <ListIcon />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
