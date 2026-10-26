import React, { useState } from 'react';
import { SocialEnterprise, DonationRecord } from '../types';
import { 
  X, 
  HeartHandshake, 
  QrCode, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle, 
  Sparkles,
  Download,
  Share2
} from 'lucide-react';

interface DonationModalProps {
  enterprise: SocialEnterprise | null;
  allEnterprises: SocialEnterprise[];
  onClose: () => void;
  onSuccess: (record: DonationRecord) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  enterprise,
  allEnterprises,
  onClose,
  onSuccess,
}) => {
  const [selectedEnterpriseId, setSelectedEnterpriseId] = useState<string>(
    enterprise ? enterprise.id : allEnterprises[0]?.id || ''
  );
  const [donationAmount, setDonationAmount] = useState<number>(30);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'paynow' | 'card'>('paynow');
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorMessage, setDonorMessage] = useState<string>('');
  const [step, setStep] = useState<'select' | 'payment' | 'success'>('select');
  const [completedRecord, setCompletedRecord] = useState<DonationRecord | null>(null);

  const activeEnterprise = allEnterprises.find((e) => e.id === selectedEnterpriseId) || enterprise;

  const presetAmounts = [15, 30, 60, 120];

  const getImpactTierText = (amount: number, name: string) => {
    if (amount <= 15) return `Sponsors 1 hour of inclusive skills training at ${name}`;
    if (amount <= 30) return `Provides 1 full week of craft materials for home-based artisans`;
    if (amount <= 60) return `Subsidizes medical & ergonomic workspace equipment`;
    return `Funds a community empowerment scholarship module at ${name}`;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : donationAmount;
    if (isNaN(finalAmount) || finalAmount <= 0) return;
    setStep('payment');
  };

  const handleConfirmPayment = () => {
    const finalAmount = customAmount ? parseFloat(customAmount) : donationAmount;
    const newRecord: DonationRecord = {
      id: `don-${Date.now()}`,
      enterpriseId: activeEnterprise?.id || '',
      enterpriseName: activeEnterprise?.name || 'Selected Social Enterprise',
      donorName: donorName.trim() || 'Generous SG Kaki',
      amount: finalAmount,
      message: donorMessage.trim() || 'Cheering you on! Thank you for the good work.',
      timestamp: 'Just now',
      paymentMethod,
      isMonthly
    };

    setCompletedRecord(newRecord);
    onSuccess(newRecord);
    setStep('success');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Direct Social Impact Donation"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-100 rounded-xl text-rose-600">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Direct Social Impact Contribution
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                100% of proceeds go directly to the verified social enterprise
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-rose-600"
            aria-label="Close donation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'select' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              {/* Recipient Enterprise */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Supporting Organization:
                </label>
                <select
                  value={selectedEnterpriseId}
                  onChange={(e) => setSelectedEnterpriseId(e.target.value)}
                  className="w-full text-xs font-medium text-stone-900 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
                >
                  {allEnterprises.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} · {e.causeLabel}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Select Contribution Amount (SGD):
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2.5">
                  {presetAmounts.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      onClick={() => {
                        setDonationAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-3 text-sm font-bold rounded-xl border transition-all tabular-nums ${
                        donationAmount === amt && !customAmount
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-sm font-bold text-stone-400">
                    $
                  </span>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    placeholder="Other custom amount in SGD"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded-xl focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Tangible Impact Preview Box */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Your Impact Outcome:</span>
                  <span>
                    {getImpactTierText(
                      customAmount ? parseFloat(customAmount) || 0 : donationAmount,
                      activeEnterprise?.name || 'the enterprise'
                    )}
                  </span>
                </div>
              </div>

              {/* Giving Frequency: One-time vs Monthly */}
              <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIsMonthly(false)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    !isMonthly ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  One-Time Contribution
                </button>
                <button
                  type="button"
                  onClick={() => setIsMonthly(true)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    isMonthly ? 'bg-white text-rose-700 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Monthly Sustaining Ally
                </button>
              </div>

              {/* Donor Name & Encouragement Message */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Your Name / Display Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Tan or Kaki from Bedok"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded-xl focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Encouraging Message to the Team &amp; Beneficiaries:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Leave a heartfelt note that will appear on their dashboard..."
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded-xl focus-visible:ring-2 focus-visible:ring-rose-600 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-rose-600"
              >
                Proceed to Secure Payment (${customAmount || donationAmount} SGD)
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="text-xs text-stone-500 font-medium">Contributing to:</span>
                  <h4 className="text-sm font-bold text-slate-900">{activeEnterprise?.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 font-medium">Total:</span>
                  <h4 className="text-base font-extrabold text-rose-600 tabular-nums">
                    ${customAmount || donationAmount} SGD
                  </h4>
                </div>
              </div>

              {/* Payment Method Switcher */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paynow')}
                  className={`flex-1 p-3 border rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    paymentMethod === 'paynow'
                      ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-600/20'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-purple-700" />
                  <span>PayNow (UEN)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 p-3 border rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-50 text-stone-900 ring-2 ring-stone-900/20'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-stone-700" />
                  <span>Credit Card</span>
                </button>
              </div>

              {paymentMethod === 'paynow' ? (
                /* PayNow QR Section */
                <div className="text-center p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <div className="w-40 h-40 mx-auto bg-white p-3 rounded-xl border border-stone-300 shadow-inner flex items-center justify-center">
                    {/* Realistic SVG PayNow QR Code */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-purple-950">
                      <rect width="100" height="100" fill="white" />
                      {/* Corner markers */}
                      <rect x="5" y="5" width="25" height="25" fill="#581C87" />
                      <rect x="8" y="8" width="19" height="19" fill="white" />
                      <rect x="11" y="11" width="13" height="13" fill="#581C87" />

                      <rect x="70" y="5" width="25" height="25" fill="#581C87" />
                      <rect x="73" y="8" width="19" height="19" fill="white" />
                      <rect x="76" y="11" width="13" height="13" fill="#581C87" />

                      <rect x="5" y="70" width="25" height="25" fill="#581C87" />
                      <rect x="8" y="73" width="19" height="19" fill="white" />
                      <rect x="11" y="76" width="13" height="13" fill="#581C87" />

                      {/* Data dots */}
                      <rect x="35" y="10" width="8" height="8" fill="#581C87" />
                      <rect x="50" y="15" width="8" height="8" fill="#581C87" />
                      <rect x="40" y="35" width="20" height="20" rx="3" fill="#E11D48" />
                      <path d="M 45 45 L 55 45 M 50 40 L 50 50" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <rect x="15" y="45" width="6" height="12" fill="#581C87" />
                      <rect x="75" y="45" width="12" height="6" fill="#581C87" />
                      <rect x="40" y="75" width="12" height="12" fill="#581C87" />
                      <rect x="65" y="70" width="8" height="8" fill="#581C87" />
                      <rect x="80" y="80" width="10" height="10" fill="#581C87" />
                    </svg>
                  </div>

                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-purple-900 block">
                      PayNow UEN: 201708234N (Verified raiSE)
                    </span>
                    <span className="text-stone-500 font-mono text-[11px]">
                      Reference: GAIGAI-{activeEnterprise?.id.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500 leading-tight">
                    Scan via PayLah!, OCBC, UOB, or GrabPay. In this prototype, click below to simulate instant payment verification.
                  </p>
                </div>
              ) : (
                /* Card Input Mockup */
                <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">Card Number</label>
                    <input
                      type="text"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full p-2 bg-white border border-stone-300 rounded-lg text-stone-800 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">Expiry</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full p-2 bg-white border border-stone-300 rounded-lg text-stone-800 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-semibold mb-1">CVC</label>
                      <input
                        type="text"
                        defaultValue="888"
                        className="w-full p-2 bg-white border border-stone-300 rounded-lg text-stone-800 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="py-2.5 px-4 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-600"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Verified Payment (${customAmount || donationAmount} SGD)</span>
                </button>
              </div>
            </div>
          )}

          {step === 'success' && completedRecord && (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  Thank You, {completedRecord.donorName}!
                </h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                  Your direct contribution of <strong>${completedRecord.amount} SGD</strong> has been successfully credited to <strong>{completedRecord.enterpriseName}</strong>.
                </p>
              </div>

              {/* Digital Certificate / Receipt Card */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500 font-medium">Receipt ID:</span>
                  <span className="font-mono font-bold text-stone-800">{completedRecord.id}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500 font-medium">Method:</span>
                  <span className="font-bold text-stone-800 uppercase">{completedRecord.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500 font-medium">Beneficiary Mission:</span>
                  <span className="font-bold text-emerald-800">{activeEnterprise?.causeLabel}</span>
                </div>
                <div>
                  <span className="text-stone-500 block mb-0.5">Your Message:</span>
                  <p className="italic text-stone-700 bg-white p-2 rounded border border-stone-200">
                    "{completedRecord.message}"
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm"
                >
                  Return to GaiGai
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
