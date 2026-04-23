(function() {
    // 1. STYLES (GLOBAL CSS)
    const styles = `
        @keyframes whatsappSlideIn {
            from { opacity: 0; transform: translateY(50px) scale(0.8); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .whatsapp-float {
            position: fixed;
            bottom: 24px;
            left: 24px;
            width: 60px;
            height: 60px;
            background-color: #25D366;
            color: #FFF;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 2px 4px 15px rgba(0,0,0,0.3);
            z-index: 1000000;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            animation: whatsappSlideIn 0.8s ease-out forwards;
            text-decoration: none;
        }
        .whatsapp-float:hover {
            transform: scale(1.1);
            filter: brightness(1.1);
            box-shadow: 2px 6px 20px rgba(0,0,0,0.4);
        }
        .whatsapp-float svg { width: 32px; height: 32px; fill: white; }

        .chat-float-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background-color: #004535;
            color: #FFF;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 25px;
            height: 60px;
            box-shadow: 2px 4px 15px rgba(0,0,0,0.3);
            z-index: 1000000;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            animation: whatsappSlideIn 0.8s ease-out forwards;
        }
        .chat-float-btn:hover {
            transform: scale(1.05);
            box-shadow: 2px 6px 20px rgba(0,0,0,0.4);
        }
        .chat-float-btn svg { width: 24px; height: 24px; fill: white; margin-right: 12px; }
        .chat-float-btn .text { font-size: 1.1rem; font-weight: 700; font-family: inherit; color: white; }
        
        .chat-notification-dot {
            position: absolute;
            top: -2px;
            right: -2px;
            width: 14px;
            height: 14px;
            background-color: #ff3b3b;
            border-radius: 50%;
            border: 2px solid #fff;
            animation: pulseDot 2s infinite;
        }
        @keyframes pulseDot {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 59, 59, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(255, 59, 59, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 59, 59, 0); }
        }

        .guided-chat-modal {
            position: fixed;
            bottom: 100px;
            right: 24px;
            width: 360px;
            max-width: calc(100vw - 48px);
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 1000001;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px) scale(0.95);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-family: inherit;
        }
        .guided-chat-modal.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0) scale(1);
        }
        @media screen and (max-width: 768px) {
            .guided-chat-modal { bottom: 85px; right: 16px; width: calc(100vw - 32px); max-width: none; }
            .chat-notification-dot { top: 0; right: 0; }
            .chat-float-btn { height: 50px; padding: 0 15px; }
            .whatsapp-float { width: 50px; height: 50px; }
            .whatsapp-float svg { width: 24px; height: 24px; }
        }
        .gcm-header { background: #004535; color: #fff; padding: 16px 20px; position: relative; }
        .gcm-header h3 { margin: 0; font-size: 1.2rem; font-weight: 700; color: #fff;}
        .gcm-header p { margin: 4px 0 0 0; font-size: 0.85rem; color: #e8f5e9; opacity: 0.9; }
        .gcm-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: #fff; font-size: 1.5rem; line-height: 1; cursor: pointer; transition: transform 0.2s; }
        .gcm-close:hover { transform: scale(1.1); }
        .gcm-body { padding: 16px; height: 380px; max-height: 50vh; overflow-y: auto; background: #f8f9fa; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth; }
        .gcm-msg { max-width: 85%; padding: 12px 16px; border-radius: 12px; font-size: 0.95rem; line-height: 1.4; animation: gcmFadeIn 0.3s ease forwards; }
        @keyframes gcmFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .gcm-msg.bot { background: #fff; color: #333; border: 1px solid #e0e0e0; border-bottom-left-radius: 4px; align-self: flex-start; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
        .gcm-msg.user { background: #004535; color: #fff; border-bottom-right-radius: 4px; align-self: flex-end; }
        .gcm-options { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; align-self: flex-start; }
        .gcm-opt-btn { background: #fff; border: 1px solid #004535; color: #004535; padding: 8px 12px; border-radius: 20px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; animation: gcmFadeIn 0.3s ease forwards; }
        .gcm-opt-btn:hover { background: #004535; color: #fff; }
        .gcm-footer { padding: 12px; background: #fff; border-top: 1px solid #eee; display: flex; gap: 8px; align-items: center; }
        .gcm-input { flex: 1; padding: 10px 14px; border: 1px solid #ddd; border-radius: 20px; outline: none; font-family: inherit; font-size: 0.95rem; transition: border-color 0.2s; }
        .gcm-input:focus { border-color: #004535; }
        .gcm-send-btn { background: #004535; color: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s, transform 0.2s; flex-shrink: 0; }
        .gcm-send-btn:hover { background: #00362A; transform: scale(1.05); }
        .gcm-send-btn svg { width: 18px; height: 18px; fill: white; margin-left: 2px;}
        .gcm-final-wrap { padding: 16px; background: #fff; border-top: 1px solid #eee; display: none; }
        .gcm-final-btn { width: 100%; background: #25D366; color: #fff; border: none; padding: 12px; border-radius: 8px; font-weight: 700; cursor: pointer; animation: gcmFadeIn 0.3s ease forwards; font-size: 1.05rem; transition: background 0.2s; }
        .gcm-final-btn:hover { background: #1ebe5d; }
        .gcm-helper { font-size: 0.85rem; color: #777; text-align: center; margin-top: 8px; line-height: 1.3; }
    `;

    // 2. INJECT EVERYTHING
    function init() {
        if (document.getElementById('global-floating-buttons')) return;

        // Injected Styles
        const styleTag = document.createElement('style');
        styleTag.innerHTML = styles;
        document.head.appendChild(styleTag);

        // Injected HTML Structure
        const container = document.createElement('div');
        container.id = 'global-floating-buttons';
        container.innerHTML = `
            <!-- WhatsApp Button -->
            <a href="https://api.whatsapp.com/send?phone=918520025000&text=Hello%20Kodam%20Conventions,%20I%20would%20like%20to%20know%20more%20about%20booking%20your%20hall.&lang=en" 
               class="whatsapp-float" target="_blank" rel="noopener noreferrer" title="Chat with us on WhatsApp">
                <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.511.895 3.012 1.348 4.608 1.35 5.454 0 9.895-4.44 9.897-9.896 0-2.644-1.029-5.132-2.9-7c-1.87-1.868-4.359-2.896-7.004-2.897-5.457 0-9.898 4.444-9.9 9.901 0 1.691.469 3.259 1.359 4.637l-.999 3.651 3.739-.982zm11.382-7.391c-.3-.149-1.774-.875-2.048-.976-.275-.1-.475-.149-.675.149-.2.299-.775.976-.95 1.176-.175.199-.35.225-.649.075-.3-.15-1.266-.467-2.411-1.485-.89-.794-1.49-1.776-1.666-2.076-.175-.3-.018-.463.13-.611.134-.133.3-.349.449-.524.15-.175.199-.299.299-.499.1-.2.05-.375-.025-.524-.075-.15-.675-1.625-.925-2.226-.243-.584-.489-.505-.675-.514-.175-.008-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.026-1.05 2.501s1.075 2.899 1.225 3.099c.15.2 2.115 3.227 5.122 4.526 2.531 1.095 2.924.877 3.449.827.525-.05 1.699-.694 1.948-1.369.25-.675.25-1.25.175-1.375s-.275-.225-.575-.375z"/></svg>
            </a>

            <!-- Chat Button -->
            <div class="chat-float-btn" id="gcm-trigger-btn">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.03 2 11c0 2.82 1.48 5.33 3.8 6.94L4.8 21.6a.75.75 0 001.07.9l3.52-1.92A10.87 10.87 0 0012 20c5.523 0 10-4.03 10-9s-4.477-9-10-9zm-2.5 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>
                <div class="text">Chat Now</div>
                <div class="chat-notification-dot"></div>
            </div>

            <!-- Chat Modal -->
            <div class="guided-chat-modal" id="guided-chat-modal">
                <div class="gcm-header">
                    <h3>Let's Chat!</h3>
                    <p>We’ll reply as soon as we can</p>
                    <button class="gcm-close" id="gcm-close-btn">&times;</button>
                </div>
                <div class="gcm-body" id="gcm-body"></div>
                <div class="gcm-footer" id="gcm-footer">
                    <input type="text" class="gcm-input" id="gcm-input-field" placeholder="Type a message...">
                    <button class="gcm-send-btn" id="gcm-send-btn">
                        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                </div>
                <div class="gcm-final-wrap" id="gcm-final-wrap">
                    <button class="gcm-final-btn" id="gcm-final-ws-btn">Continue to WhatsApp</button>
                    <div class="gcm-helper">You’ll be redirected to WhatsApp — just tap ‘Send’ to confirm your enquiry.</div>
                </div>
            </div>
        `;
        document.body.appendChild(container);

        setupLogic();
    }

    function setupLogic() {
        var triggerBtn = document.getElementById('gcm-trigger-btn');
        var chatModal = document.getElementById('guided-chat-modal');
        var closeBtn = document.getElementById('gcm-close-btn');
        var chatBody = document.getElementById('gcm-body');
        var chatInput = document.getElementById('gcm-input-field');
        var sendBtn = document.getElementById('gcm-send-btn');
        var footerWrap = document.getElementById('gcm-footer');
        var finalWrap = document.getElementById('gcm-final-wrap');
        var wsSubmitBtn = document.getElementById('gcm-final-ws-btn');

        var chatState = {
            step: 0,
            data: { name: '', phone: '', eventDate: '', eventSlot: '', guests: '', eventType: '', message: '' }
        };

        var todayD = new Date();
        var minDStr = todayD.getFullYear() + '-' + String(todayD.getMonth() + 1).padStart(2, '0') + '-' + String(todayD.getDate()).padStart(2, '0');

        function addBotMessage(text) {
            var div = document.createElement('div');
            div.className = 'gcm-msg bot';
            div.textContent = text;
            chatBody.appendChild(div);
            scrollToBottom();
        }

        function addUserMessage(text) {
            var div = document.createElement('div');
            div.className = 'gcm-msg user';
            div.textContent = text;
            chatBody.appendChild(div);
            scrollToBottom();
        }

        function addOptions(opts) {
            var wrap = document.createElement('div');
            wrap.className = 'gcm-options';
            opts.forEach(function(opt) {
                var btn = document.createElement('button');
                btn.className = 'gcm-opt-btn';
                btn.textContent = opt;
                btn.addEventListener('click', function() {
                    wrap.style.display = 'none';
                    handleUserInput(opt);
                });
                wrap.appendChild(btn);
            });
            chatBody.appendChild(wrap);
            scrollToBottom();
        }

        function scrollToBottom() { chatBody.scrollTop = chatBody.scrollHeight; }

        function progressChat() {
            chatState.step++;
            chatInput.type = 'text';
            chatInput.disabled = false;
            
            setTimeout(function() {
                switch(chatState.step) {
                    case 1:
                        addBotMessage("Hi 👋 Welcome to Kodam Convention!");
                        setTimeout(function(){ addBotMessage("May I know your name?"); }, 600);
                        break;
                    case 2:
                        chatInput.style.display = 'block';
                        chatInput.type = 'tel';
                        chatInput.setAttribute('maxlength', '10');
                        addBotMessage("Great, " + chatState.data.name + "! Could you share your phone number so we can assist you better?");
                        break;
                    case 3:
                        chatInput.style.display = 'block';
                        chatInput.type = 'date';
                        chatInput.removeAttribute('maxlength');
                        chatInput.setAttribute('min', minDStr);
                        addBotMessage("Select your event date");
                        break;
                    case 4:
                        chatInput.disabled = true;
                        addBotMessage("Select event slot");
                        addOptions(["Morning Slot", "Evening Slot", "Full Day"]);
                        break;
                    case 5:
                        chatInput.disabled = true;
                        addBotMessage("Approx number of guests?");
                        addOptions(["50–100", "100–200", "200–400", "400–600", "600–1000", "1000+"]);
                        break;
                    case 6:
                        chatInput.disabled = true;
                        addBotMessage("Event type?");
                        addOptions(["Wedding", "Reception", "Corporate Event", "Party", "Other"]);
                        break;
                    case 7:
                        chatInput.disabled = false;
                        chatInput.style.display = 'block';
                        addBotMessage("Any special message? (optional)");
                        break;
                    case 8:
                        footerWrap.style.display = 'none';
                        finalWrap.style.display = 'block';
                        break;
                }
            }, 300);
        }

        function handleUserInput(val) {
            var ans = val.trim();
            if (chatState.step !== 7 && ans === '') return;
            if (chatState.step === 2) {
                ans = ans.replace(/[^0-9]/g, '');
                if (ans.length !== 10) { alert("Please enter a valid 10-digit phone number."); return; }
            }
            if (chatState.step === 7 && ans === '') ans = "No message";
            addUserMessage(ans);
            chatInput.value = '';

            if (chatState.step === 1) chatState.data.name = ans;
            else if (chatState.step === 2) chatState.data.phone = ans;
            else if (chatState.step === 3) chatState.data.eventDate = ans;
            else if (chatState.step === 4) chatState.data.eventSlot = ans;
            else if (chatState.step === 5) chatState.data.guests = ans;
            else if (chatState.step === 6) chatState.data.eventType = ans;
            else if (chatState.step === 7) chatState.data.message = ans;

            progressChat();
        }

        if (triggerBtn) {
            triggerBtn.addEventListener('click', function() {
                chatModal.classList.add('active');
                if (chatState.step === 0) progressChat();
            });
        }
        if (closeBtn) closeBtn.addEventListener('click', function() { chatModal.classList.remove('active'); });
        if (sendBtn) sendBtn.addEventListener('click', function() { handleUserInput(chatInput.value); });
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') handleUserInput(chatInput.value); });
        }

        if (wsSubmitBtn) {
            wsSubmitBtn.addEventListener('click', function() {
                fetch("https://docs.google.com/forms/d/e/1FAIpQLSeNfH6EBNaqtU8JSEMV6zqRZgq2e8JZdL3IjZzQIdbfFY_Fjg/formResponse", {
                    method: "POST",
                    mode: "no-cors",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: "entry.1373193098=" + encodeURIComponent(chatState.data.name) +
                          "&entry.1089583976=" + encodeURIComponent(chatState.data.phone) +
                          "&entry.DATE_ID=" + encodeURIComponent(chatState.data.eventDate) +
                          "&entry.518329641=" + encodeURIComponent(chatState.data.eventSlot) +
                          "&entry.1466311962=" + encodeURIComponent(chatState.data.guests) +
                          "&entry.926497588=" + encodeURIComponent(chatState.data.eventType) +
                          "&entry.1629751736=" + encodeURIComponent(chatState.data.message)
                }).catch(function(e) { console.error(e); });

                var waMsg = "Hello Kodam Convention,\nI would like to check availability.\n\n";
                waMsg += "Event Date: " + chatState.data.eventDate + "\n";
                waMsg += "Event Slot: " + chatState.data.eventSlot + "\n";
                waMsg += "Guests: " + chatState.data.guests + "\n";
                waMsg += "Event Type: " + chatState.data.eventType + "\n\n";
                waMsg += "Name: " + chatState.data.name + "\n";
                waMsg += "Phone: " + chatState.data.phone + "\n";
                
                var waUrl = "https://api.whatsapp.com/send?phone=918520025000&text=" + encodeURIComponent(waMsg) + "&lang=en";
                chatModal.classList.remove('active');
                window.open(waUrl, '_blank');
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
