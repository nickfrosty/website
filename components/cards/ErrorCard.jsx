/* eslint-disable @next/next/no-img-element */
import { ExclamationIcon } from "@heroicons/react/solid";

export function ErrorCard({
  title = "An error occurred!",
  msg = "An unknown error occurred. Please try again.",
}) {
  return (
    <div className="p-6 card card-error">
      <div className="space-x-4 flexer">
        <div className="place-self-start text-red-600 icon-lg">
          <ExclamationIcon className="" />
        </div>
        <div className="space-y-2">
          <h4 className="heading">{title}</h4>
          {msg && <p className="text-gray-500">{msg}</p>}
        </div>
      </div>
    </div>
  );
}
