function loadAddNodes() {
    fetch("https://api.adventurecoin.quest/peers")
        .then(res => res.json())
        .then(data => {
            const cliList = document.getElementById("cli-addnodes");
            const confList = document.getElementById("conf-addnodes");

            cliList.textContent = "";
            confList.textContent = "";

            if (data.error) {
                cliList.textContent = "Error loading peers.";
                confList.textContent = "Error loading peers.";
                return;
            }

            const peers = data.result;
            if (!peers || peers.length === 0) {
                cliList.textContent = "No peers connected.";
                confList.textContent = "No peers connected.";
                return;
            }

            const uniqueIPs = new Set();

            peers.forEach(peer => {
                let ip = peer.addr;

                // Handle IPv6 [address]:port and IPv4 address:port
                if (ip.startsWith("[")) {
                    // IPv6 with brackets: [addr]:port
                    const endBracket = ip.indexOf("]");
                    if (endBracket !== -1) {
                        ip = ip.substring(1, endBracket);
                    }
                } else if (ip.includes(":")) {
                    // IPv4 or non-bracketed IPv6
                    const lastColonIndex = ip.lastIndexOf(":");
                    const possiblePort = ip.substring(lastColonIndex + 1);
                    if (!isNaN(parseInt(possiblePort))) {
                        ip = ip.substring(0, lastColonIndex);
                    }
                }

                uniqueIPs.add(ip);
            });

            uniqueIPs.forEach(ip => {
                cliList.textContent += `addnode "${ip}" add\n`;
                confList.textContent += `addnode=${ip}\n`;
            });
        })
        .catch(err => {
            document.getElementById("cli-addnodes").textContent = "Failed to load peers.";
            document.getElementById("conf-addnodes").textContent = "Failed to load peers.";
            console.error("Peer fetch error:", err);
        });
}

document.addEventListener("DOMContentLoaded", loadAddNodes);
