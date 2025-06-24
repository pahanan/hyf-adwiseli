import Button from '@/components/ui/Button'
import { BaseInput } from '@/components/ui/Input'
import { cn } from '@/helpers/utils'
import { RiMessage2Fill } from '@remixicon/react'
import { Send, SendHorizonal } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

type ConversationInputProps = {
	sendMessage: (text: string, callback: (result: Boolean) => void) => void
}

export function ConversationInput({ sendMessage }: ConversationInputProps) {
	const [submitting, setSubmitting] = useState(false)
	const [text, setText] = useState('')
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	// Auto-resize function
	const resizeTextarea = () => {
		const textarea = textareaRef.current
		if (!textarea) return

		// Reset height to auto to get the correct scrollHeight
		textarea.style.height = 'auto'

		// Set the height based on scrollHeight, but cap at 500px
		const newHeight = Math.min(textarea.scrollHeight, 200)
		textarea.style.height = `${newHeight}px`
	}

	// Resize on text change
	useEffect(() => {
		resizeTextarea()
	}, [text])

	async function onSendMessage() {
		console.log('onSendMessage')
		if (submitting) return
		if (!text) return

		setSubmitting(true)
		sendMessage(text, (value) => {
			setSubmitting(false)
			if (value) {
				setText('')
				// Reset height when text is cleared
				if (textareaRef.current) {
					textareaRef.current.style.height = 'auto'
				}
			}
		})
	}

	function textContainsOnlyWhitespace(text: string) {
		return !text.trim()
	}

	return (
		<div className="bg-white border-t shadow-neutral-400/20 flex items-start gap-2 p-2 pr-5 pt-5">
			<textarea
				ref={textareaRef}
				className={cn(
					'text-gray-600 font-normal text-base bg-white flex rounded-md w-full border border-gray-200 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 outline-none focus-visible:ring-2 ring-primary',
					'border-none focus-visible:ring-0 focus-visible:outline-none',
					'overflow-y-auto resize-none min-h-[60px]'
				)}
				placeholder="Type a message..."
				value={text}
				onChange={(e) => setText(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault()
						onSendMessage()
					}
				}}
				disabled={submitting}
				rows={1}
			/>
			<div>
				<Button
					size="sm"
					onClick={onSendMessage}
					disabled={
						submitting || !text || textContainsOnlyWhitespace(text)
					}
					loading={submitting}
					className="rounded-full aspect-square p-1"
				>
					<SendHorizonal fill="#fff" size={18} />
				</Button>
			</div>
		</div>
	)
}
