import { useState } from 'react';
import { SubmitHandler, useForm, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicUserSchema } from './User';
import type { UserBasicFormWithAddress } from './User';
import { useStore } from "../store/useStore";
import { Order } from '../types';


export default function SubmitOrderForm() {

    const navigate = useNavigate();
    const cart = useStore((s) => s.cart);
    const createOrder = useStore((s) => s.createOrder);
    const clearCart = useStore((s) => s.clearCart);
    const totalPrice = useStore((s) => s.totalCostFormatted());
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors }, trigger } =
      useForm<UserBasicFormWithAddress>({
        resolver: zodResolver(BasicUserSchema),
    });

    const onSubmit: SubmitHandler<UserBasicFormWithAddress> = async (formData) => {
        try {
          const orderPayload: Omit<Order, "id"> = {
            ...formData,
            cart,
            totalPrice
          }
          const id = await createOrder(orderPayload);
          if(!id) return;
          clearCart();
          setIsSubmitted(true);
        } catch (err) {
          console.error(err);
        }
    }

    function getError<T extends FieldValues>( errors: FieldErrors<T>, path: Path<T> ): string | undefined {
        const parts = path.split(".");
        let current: unknown = errors;
        for (const part of parts) {
          if (
            current &&
            typeof current === "object" &&
            part in current
          ) {
            // @ts-expect-error TS doesn’t track nested narrowing perfectly here
            current = current[part];
          } else {
            return undefined;
          }
        }
        return (current as { message?: string })?.message;
    }

      const fields: {
        id: Path<UserBasicFormWithAddress>;
        label: string;
        type: string;
        placeholder: string;
        }[] = [
          { id: "name", label: "Name", type: "text", placeholder: "John Doe" },
          { id: "email", label: "Email", type: "email", placeholder: "johndoe90@hotmail.com" },
          { id: "phone", label: "Phone", type: "tel", placeholder: "555-555-5555" },
          { id: "street", label: "Street", type: "text", placeholder: "555 Sycamore St." },
          { id: "suite", label: "Suite/Apt", type: "text", placeholder: "212 B" },
          { id: "city", label: "City", type: "text", placeholder: "Kansas City" },
          { id: "zipcode", label: "Zip Code", type: "text", placeholder: "55555-1234" }
        ];
    
    return (
    <main className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-[#1A2A50] text-white px-4! py-8! flex flex-col items-center">
      <div className="w-full max-w-2xl flex items-center mb-8!">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="mr-2! w-5 h-5" />
          Back to Cart
        </button>
      </div>

      <h1 className="text-3xl font-semibold mb-6! text-center text-white">Complete Your Order</h1>

      <button
        onClick={() => trigger()}
        className="bg-gray-700 hover:bg-gray-600 text-white rounded-md px-4! py-2! mb-6! transition-all"
      >
        Display Data Requirements
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-linear-to-br from-gray-900 via-gray-800 to-[#1A2A50] backdrop-blur-md p-8! rounded-2xl shadow-xl flex flex-col gap-5 border border-gray-700"
      >
        {fields.map((field) => {
          const error = getError(errors, field.id);
          return (
            <div key={field.id} className="flex flex-col gap-2">
              <label htmlFor={field.id} className="text-lg font-medium">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.id)}
                className={`bg-gray-900 border ${
                  error ? "border-red-500" : "border-gray-600"
                } rounded-lg px-4! py-2! text-white focus:outline-none focus:ring-1 focus:ring-red-700 transition-all`}
              />
              {error && <p className="text-sm text-red-400 italic mt-1!">{error}</p>}
            </div>
          );
        })}

        <button
          type="submit"
          className="mt-6! bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg px-6! py-3! transition-transform hover:scale-[1.01] shadow-lg"
        >
          Submit Order
        </button>
      </form>
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-2xl p-8! max-w-md w-full shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-2! text-green-400">Order Submitted!</h2>
            <p className="text-gray-300 mb-6!">
              Thank you for your purchase! You’ll receive confirmation shortly.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-red-800 hover:bg-red-700 text-white px-6! py-3! rounded-lg transition-all"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
    </main>

    )
}