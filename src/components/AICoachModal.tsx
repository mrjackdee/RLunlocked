import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, HelpCircle, Lightbulb } from 'lucide-react';
import { AppState } from '../types';

interface AICoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: AppState;
}

export const AICoachModal: React.FC<AICoachModalProps> = ({
  isOpen,
  onClose,
  state,
}) => {
  if (!isOpen) return null;

  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<
    Array<{ sender: 'ai' | 'user'; text: string }>
  >([
    {
      sender: 'ai',
      text: `Hello ${state.managerName}! I'm your UnLocked Leadership Coach, built on Randy Locke's UnLocked Manager Success System. How can I support your development today? You can ask me to help refine a priority statement, draft a shift huddle, prepare a coaching conversation, or analyze an operational root cause.`,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    'Refine my 30-Day Priority Statement',
    'Draft a 5-minute Shift Huddle script',
    'Help me prepare a coaching conversation for a missed deadline',
    'How do I perform a 5-Whys root cause analysis for an operational bottleneck?',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim()) return;

    const userMsg = { sender: 'user' as const, text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          context: `Manager: ${state.managerName}, Active Priority: "${state.priorityPlanner.finalPriorityStatement}"`,
          type: 'Coach',
        }),
      });

      const data = await response.json();
      const replyText = data.reply || 'No response received from AI Coach.';
      setMessages((prev) => [...prev, { sender: 'ai', text: replyText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Unable to connect to AI Coach at the moment. Please ensure server API endpoints are online.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[85vh] max-h-[700px]">
        {/* Modal Header */}
        <div className="bg-[#0F2537] text-white p-4 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">RANDY LOCKE — AI LEADERSHIP COACH</h3>
              <p className="text-[10px] text-blue-300">UnLocked Manager Success System Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions Bar */}
        <div className="bg-slate-100 p-2.5 border-b border-slate-200 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 flex-shrink-0">
            <Lightbulb className="w-3 h-3 text-amber-500" />
            Quick Prompts:
          </span>
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-300 rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap flex-shrink-0 transition-colors shadow-2xs"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${
                m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-blue-900 text-white'
                    : 'bg-[#0F2537] text-amber-300'
                }`}
              >
                {m.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white font-medium rounded-tr-none shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs whitespace-pre-wrap'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-2 text-xs text-slate-500 italic p-2">
              <Sparkles className="w-4 h-4 animate-spin text-amber-500" />
              <span>Randy Locke Coach is analyzing leadership evidence...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Randy Locke AI Coach for leadership guidance..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 outline-none focus:border-blue-600"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !prompt.trim()}
            className="bg-[#0F2537] hover:bg-blue-900 disabled:opacity-50 text-white p-2.5 rounded-xl transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
