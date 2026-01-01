import { headerLinks } from "@/configs/headerLinks";
import Link from "next/link";
import SearchInput from "./SearchInput";

export default function Header() {
  return (
    <header className="bg-white w-full z-10 fixed flex justify-around items-center p-5 rounded-bl-4xl rounded-br-4xl ">
      <h2 className="text-3xl">Shoppy</h2>
      <div className="flex">
        {headerLinks.map((link) => {
          return (
            <Link
              href={link.href}
              key={link.name}
              className="flex items-center gap-2 px-3 py-2 hover:opacity-80"
            >
              {link.icon && <link.icon />}
              {link.name && (
                <span className="transition-opacity duration-200">
                  {link.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <SearchInput></SearchInput>
    </header>
  );
}
