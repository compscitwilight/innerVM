if ! [ -d "/usr/share/git" ]
then
    echo "You are missing the package 'git'.";
    echo "To install on Ubuntu, run 'sudo apt-get install git'";
    echo "To install on Arch, run 'sudo pacman -S git'";
    echo "To install on Fedora, run 'sudo dnf install git'";
    exit;
fi

if ! [ -d "/usr/share/nodejs" ]
then
    echo "You are missing the package 'nodejs'.";
    echo "To install on Ubuntu/Mint, run 'sudo apt-get install nodejs'";
    echo "To install on Arch, run 'sudo pacman -S nodejs'";
    echo "To insatll on Fedora, run 'sudo dnf install nodejs'";
    exit;
fi

git clone https://github.com/devrusty/innerVM "/usr/share/innerVM";
cd "/usr/share/innerVM";
npm install;

cd "/usr/share/applications";
sudo touch "Inner.desktop";
echo "[Desktop Entry]" >> "Inner.desktop";
echo "Name=Inner" >> "Inner.desktop";
echo "Exec=cd /usr/share/innerVM && npm run start";