import { useStore } from "../store/useStore";
import { ReactElement } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

type PropsType = {
    viewCart: boolean,
}

const Footer = ({ viewCart }: PropsType): ReactElement => {
    const totalItems = useStore((s) => s.totalItems()); 
    const totalPrice = useStore((s) => s.totalCostFormatted());
    const year = new Date().getFullYear();

    return (
        <footer className="bg-linear-to-tr from-gray-900 via-gray-800 to-[#1A2A50] text-white p-8! font-light">
            <div className="max-w-6xl mx-auto! grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-lg font-bold mb-2!">Watch MEes</h3>
                    <p className="text-md text-gray-200">1234 Elm Street, Suite 100</p>
                    <p className="text-md text-gray-200">New York, NY 10001</p>
                    <p className="text-md text-gray-200">Email: info@watchme.com</p>
                    <p className="text-md text-gray-200">Phone: (555) 123-4567</p>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-2!">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><a href="/" className="text-md hover:underline text-gray-200">Home</a></li>
                        <li><a href="/" className="text-md hover:underline text-gray-200">About Us</a></li>
                        <li><a href="/" className="text-md hover:underline text-gray-200">Contact</a></li>
                        <li><a href="/" className="text-md hover:underline text-gray-200">FAQ</a></li>
                    </ul>
                </div>

                <div className="flex flex-col justify-between h-full">
                    {!viewCart && (
                        <div className="mb-4">
                            <h3 className="text-lg font-bold mb-2!">Your Cart</h3>
                            <p className="text-md text-gray-200">Total Items: {totalItems}</p>
                            <p className="text-md text-gray-200">Total Price: {totalPrice}</p>
                        </div>
                    )}
                    <div>
                        <h3 className="text-lg font-bold mb-2!">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="/" className="hover:text-gray-300"><Facebook className="w-5 h-5"/></a>
                            <a href="/" className="hover:text-gray-300"><Instagram className="w-5 h-5"/></a>
                            <a href="/" className="hover:text-gray-300"><Twitter className="w-5 h-5"/></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center text-gray-500 text-sm mt-8!">
                &copy; {year} Watch ME. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
