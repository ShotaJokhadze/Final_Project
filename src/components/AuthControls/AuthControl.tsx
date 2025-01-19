import { FiLogOut, FiLogIn } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import Loader from "../Loader/Loader";
import { Link } from "../../i18n/routing";

interface AuthControlsProps {
  session: boolean | null;
  locale: string;
  handleLogout: () => void;
  t: (key: string) => string;
}

export default function AuthControls({
  session,
  locale,
  handleLogout,
  t,
}: AuthControlsProps): JSX.Element {
  return (
    <>
      <div>
        <Link href="/profile">
          <FaUser className="text-[35px]" />
        </Link>
      </div>
      {session === null ? (
        <div>
          <Loader />
        </div>
      ) : !session ? (
        <a className="flex items-center" href={`/${locale}/login`}>
          <span className="bg-mediumGray text-light p-2 rounded-md text-center flex items-center justify-center gap-1 min-h-[40px] min-w-[40px]">
            <span className="hidden lg:inline">{t("login")}</span>
            <FiLogIn />
          </span>
        </a>
      ) : (
        <a className="flex items-center">
          <button
            onClick={handleLogout}
            className="bg-mediumGray text-light p-2 rounded-md text-center flex items-center justify-center gap-1 min-h-[40px] min-w-[40px]"
          >
            <span className="hidden lg:inline">{t("logout")}</span>
            <FiLogOut />
          </button>
        </a>
      )}
    </>
  );
}
