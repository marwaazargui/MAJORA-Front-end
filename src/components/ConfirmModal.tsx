import Modal from './Modal';

export default function ConfirmModal({ title, message, confirmLabel, onConfirm, onClose }: {
  title: string; message: string; confirmLabel: string; onConfirm: () => void; onClose: () => void;
}) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className="mb-6 text-sm text-muted">{message}</p>
      <div className="flex justify-end gap-3">
        <button className="btn-outline" onClick={onClose}>Cancel</button>
        <button
          className="inline-flex items-center rounded-lg bg-danger px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          onClick={() => { onConfirm(); onClose(); }}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
