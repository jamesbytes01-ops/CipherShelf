export const generateEbookHtml = (book) => {
  const { id, title, author, description } = book;
  
  let chapter1Title = "Chapter 1: Introduction";
  let chapter1Text = "<p>In the rapidly evolving landscape of cybersecurity, understanding the fundamental principles of defense and offense is paramount. Threat actors continuously innovate, requiring practitioners to maintain a rigorous methodology and a deep understanding of underlying protocols.</p><p>This manual provides an authoritative exploration of these concepts, bridging the gap between theoretical knowledge and practical application in enterprise environments.</p>";
  
  let chapter2Title = "Chapter 2: Core Mechanisms";
  let chapter2Text = "<p>Before diving into advanced exploitation or defense strategies, we must establish a baseline understanding of how modern operating systems and networks function under the hood. Security boundaries are often breached not through novel mathematics, but through logical flaws in implementation and misconfigurations.</p><p>By auditing configurations, analyzing traffic patterns, and enforcing least privilege, we construct a resilient architecture capable of withstanding sophisticated intrusions.</p>";

  if (id === 'blue-team-handbook') {
    chapter1Title = "Chapter 1: The Incident Response Process";
    chapter1Text = "<p>Incident response is not merely a technical endeavor; it is a critical business function designed to minimize the impact of a security breach. The standard lifecycle encompasses Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned.</p><p>In the Preparation phase, blue teams must establish communication protocols, define severity matrices, and ensure that logging infrastructure captures the necessary telemetry. When an alert fires in the SIEM, the transition to Identification requires rapid triage to distinguish false positives from genuine threats.</p>";
    chapter2Title = "Chapter 2: Network Evidence and Packet Analysis";
    chapter2Text = "<p>Analyzing network traffic is often the most reliable method for uncovering lateral movement and exfiltration. Attackers can clear host logs, but they cannot hide their packets if full PCAP or robust NetFlow data is retained.</p><p>Using tools like Wireshark and Zeek, incident responders look for anomalous TLS handshakes, unexpected beaconing patterns to unknown infrastructure, and protocol mismatches on standard ports.</p>";
  } else if (id === 'rtfm') {
    chapter1Title = "Chapter 1: Red Team Operations";
    chapter1Text = "<p>The Red Team Field Manual is designed to be a quick reference guide for penetration testers and red team members. During an engagement, time is of the essence, and memorizing every flag for every command-line tool is impractical.</p><p>This guide compiles the most essential syntaxes for Nmap, Netcat, Windows command line, and various scripting languages. Operational security (OPSEC) dictates that tools must be executed correctly the first time to avoid triggering early detection mechanisms.</p>";
    chapter2Title = "Chapter 2: Windows Command Line \u0026 PowerShell";
    chapter2Text = "<p>Windows environments dominate the corporate landscape. Understanding native tools is critical for living-off-the-land (LotL) techniques. For example, querying active directory can be done purely through built-in binaries like `net`, `dsquery`, or PowerShell's `ActiveDirectory` module.</p><p>Execution policies in PowerShell can often be bypassed simply by launching the executable with the `-ExecutionPolicy Bypass` flag, allowing scripts to run in memory without touching the disk.</p>";
  } else if (id === 'operator-handbook') {
    chapter1Title = "Chapter 1: Operational Security (OPSEC)";
    chapter1Text = "<p>Whether you are conducting a penetration test or operating as a system administrator, OPSEC is the foundation of secure operations. It involves identifying critical information, analyzing the threats, and applying countermeasures.</p><p>For operators, this means utilizing jump boxes, proxy chains, and encrypted tunnels. Exposing your origin IP or utilizing an unencrypted protocol during an engagement compromises the integrity of the operation and exposes the infrastructure to counter-attacks.</p>";
    chapter2Title = "Chapter 2: Infrastructure Setup";
    chapter2Text = "<p>Deploying C2 (Command and Control) infrastructure requires careful planning. A robust setup separates the team server from the redirectors. Redirectors mask the true location of the C2, acting as dumb proxies that forward traffic based on specific HTTP headers or URI patterns.</p><p>Using tools like socat, iptables, or Nginx reverse proxies, operators can ensure that if a redirector is identified and blocked by the blue team, the core infrastructure remains intact.</p>";
  } else if (id === 'owasp-testing-guide') {
    chapter1Title = "Chapter 1: Information Gathering";
    chapter1Text = "<p>The foundation of any web application security assessment is thorough information gathering. Before a single payload is fired, testers must map the application's attack surface. This includes enumerating subdomains, identifying the underlying technology stack, and spidering the application to map out all endpoints and parameters.</p><p>Open Source Intelligence (OSINT) plays a huge role here. Checking search engines, public code repositories, and archived snapshots can reveal forgotten development endpoints or exposed credentials.</p>";
    chapter2Title = "Chapter 2: Authentication Testing";
    chapter2Text = "<p>Authentication mechanisms are the primary gatekeepers of sensitive data. Testing them involves looking for flaws in the login process, session management, and password recovery workflows.</p><p>Common vulnerabilities include username enumeration, weak password policies, lack of brute-force protection, and flawed logic in OAuth or SAML implementations. A secure application must enforce robust password hashing and mandate Multi-Factor Authentication (MFA) for critical actions.</p>";
  } else if (id === 'practical-social-engineering') {
    chapter1Title = "Chapter 1: The Psychology of Persuasion";
    chapter1Text = "<p>Social engineering exploits human psychology rather than technical vulnerabilities. At its core, it relies on principles of persuasion: Authority, Intimidation, Consensus, Scarcity, Familiarity, and Trust. By manipulating these triggers, an attacker can bypass the most sophisticated firewalls.</p><p>For instance, creating a sense of urgency (Scarcity) combined with a spoofed email from a C-level executive (Authority) often bypasses critical thinking, prompting the victim to execute a malicious payload or transfer funds.</p>";
    chapter2Title = "Chapter 2: Pretexting and Phishing";
    chapter2Text = "<p>Pretexting involves creating a fabricated scenario to persuade a targeted victim to release information or perform an action. This requires extensive OSINT gathering to make the scenario believable. The attacker must know the target's vendors, colleagues, and typical workflows.</p><p>Phishing campaigns operationalize these pretexts at scale. Modern phishing uses highly personalized spear-phishing tactics, leveraging newly registered domains that visually mimic internal portals to capture credentials and session tokens.</p>";
  }

  return `<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.8; color: #1e293b; }
    h1 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; font-size: 2.5rem; margin-bottom: 0.5rem; }
    .meta { color: #64748b; font-size: 1.1rem; margin-bottom: 2rem; font-weight: 500; }
    .watermark { padding: 1rem 1.5rem; background: #f8fafc; color: #475569; border-radius: 0.5rem; margin-bottom: 2.5rem; border: 1px solid #e2e8f0; font-size: 0.9rem; display: flex; align-items: center; gap: 10px; }
    .watermark-badge { background: #3b82f6; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
    h2 { color: #0f172a; margin-top: 3rem; font-size: 1.8rem; }
    p { font-size: 1.1rem; margin-bottom: 1.5rem; text-align: justify; }
    .desc { font-style: italic; color: #475569; border-left: 4px solid #cbd5e1; padding-left: 1rem; margin-bottom: 3rem; }
  </style>
</head>
<body>
  <div class="watermark">
    <span class="watermark-badge">Premium</span>
    <span><strong>CyberShelf Authorized Copy</strong> &mdash; This digital edition is licensed to the current user.</span>
  </div>
  <h1>${title}</h1>
  <div class="meta">By ${author}</div>
  <div class="desc">${description}</div>
  
  <h2>${chapter1Title}</h2>
  ${chapter1Text}
  
  <h2>${chapter2Title}</h2>
  ${chapter2Text}
  
  <h2 style="color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 2rem; margin-top: 4rem; text-align: center;">End of Chapter 2 Preview</h2>
</body>
</html>`;
};
