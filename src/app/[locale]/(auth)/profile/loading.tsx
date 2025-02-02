import Loader from "../../../../components/Loader/Loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
      <Loader />
    </div>
  );
}