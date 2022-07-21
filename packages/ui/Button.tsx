interface Props {
  children: string;
}

export const Button = ({ children }: Props) => (
  <button
    type="button"
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    {children}
  </button>
);
