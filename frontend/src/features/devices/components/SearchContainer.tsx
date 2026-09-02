import { SortMethods } from "../types";

export function SearchContainer({
  sortBy,
  inputValue,
  toggleApply,
  handleSortChange,
  handleInputChange,
}: {
  sortBy: SortMethods;
  inputValue: string;
  toggleApply: () => void;
  handleSortChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  >;
}) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Devices</h1>

        <p className="mt-1 text-sm text-slate-500">
          Devices detected on your network
        </p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={toggleApply}
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-400 transition hover:bg-slate-800 hover:text-slate-200"
          title="Refresh"
        >
          ↻
        </button>
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-600"
        >
          <option value={SortMethods.byLastSeen}>Last Seen</option>
          <option value={SortMethods.byFirstSeen}>First Seen</option>
          <option value={SortMethods.byUpdates}>Number of Updates</option>
          <option value={SortMethods.byDeviceType}>Device Type</option>
          <option value={SortMethods.byMacAddress}>MAC Address</option>
          <option value={SortMethods.byVendor}>Vendor</option>
        </select>

        {sortBy === SortMethods.byLastSeen ||
        sortBy === SortMethods.byFirstSeen ||
        sortBy === SortMethods.byUpdates ? (
          <select
            value={inputValue}
            onChange={handleInputChange}
            className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-600"
          >
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        ) : (
          <input
            type="text"
            placeholder="Value..."
            value={inputValue}
            onChange={handleInputChange}
            className="w-56 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-600"
          />
        )}
        <button
          onClick={toggleApply}
          type="button"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          Apply
        </button>
      </div>
    </>
  );
}
