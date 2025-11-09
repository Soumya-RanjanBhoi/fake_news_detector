import ResultCard from '../ResultCard';

export default function ResultCardExample() {
  return (
    <div className="space-y-6 p-6">
      <ResultCard label="REAL NEWS" probability={0.92} />
      <ResultCard label="FAKE NEWS" probability={0.87} />
    </div>
  );
}
