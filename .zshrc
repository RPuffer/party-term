# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH=/Users/PUF1501/.oh-my-zsh

POWERLEVEL9K_MODE='nerdfont-complete'

# Set name of the theme to load. Optionally, if you set this to "random"
# it'll load a random theme each time that oh-my-zsh is loaded.
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
ZSH_THEME="powerlevel9k/powerlevel9k"

# Set list of themes to load
# Setting this variable when ZSH_THEME=random
# cause zsh load theme from this variable instead of
# looking in ~/.oh-my-zsh/themes/
# An empty array have no effect
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
  git,
  zsh-autosuggestions
)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/rsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

prompt_zsh_party(){
  local fname=$(ls '/Users/PUF1501/temp/termicon/parrots' | gshuf -n 1)
  local img=$(imgcat '/Users/PUF1501/temp/termicon/parrots/'$fname)
  echo -n $img'\n'
}
prompt_zsh_weather(){
  local weather=$(curl -s "http://api.apixu.com/v1/current.json?key=<your-api-key>&q=<zip-code>")
  # local condicon=$(echo $weather | jq .current.condition.icon | sed -e 's/^"//' -e 's/"$//')
  local temp=$(echo $weather | jq .current.temp_f)
  local feel=$(echo $weather | jq .current.feelslike_f)
  local condition=$(echo $weather | jq .current.condition.text)
  #Default value
  local color='%F{green}'
  local symbol="\uf2c7"
  
  # wget -q /Users/PUF1501/temp/weather/ 'http:${condicon}'
  # local iconfile='/Users/PUF1501/temp/weather/'$(ls /Users/PUF1501/temp/weather/)

  if [[ $condition == *"rain"* ]] ;
  then symbol="\uf043" ; color='%F{blue}'
  fi

  if [[ $condition == *"Mist"* || $condition == *"mist"* ]] ;
  then symbol="\ue201" ; color='%F{blue}'
  fi

  if [[ $condition == *"cloudy"* || $condition == *"Overcast"* ]] ;
  then symbol="\uf0c2" ; color='%F{grey}';
  fi

  if [[ $condition == *"Partly cloudy"* ]] ;
  then symbol="\ue21d" ; color="%F{grey}";
  fi

  if [[ $condition == *"snow"* || $condition == *"Snow"* ]] ;
  then symbol="\uf2dc" ; color="%F{grey}";
  fi

  if [[ $condition == *"thunder"* || $condition == *"storm"* ]] ;
  then symbol="\uf0e7" ; color="%F{yellow}";
  fi

  if [[ $condition == *"Sunny"* ]] ;
  then symbol="\uf185" ; color='%F{yellow}';
  fi

  # echo -n  ' '"%{$color%}$temp\u2103  $symbol "
  echo -n  "  %{%F{8}%}\ue0ba%{%K{8}%}"" %{%F{white}%}$feel˚F  %{$color%}$symbol "
  # echo -n  "  %{%F{8}%}\ue0c2%{%K{8}%}"" %{%F{white}%}$feel˚F  %{$color%}$(list_file $iconfile) "
}
prompt_zsh_battery_level() {
    percentage=`pmset -g batt | egrep "([0-9]+\%).*" -o --colour=auto | cut -f1 -d';' | grep -oe '\([0-9.]*\)' | awk '{printf("%d", ($1 / 10))}'`
    local color='%F{red}'
    local symbol="\uf00d"
    if [ $(bc <<< "scale=2 ; $percentage<25") = '1' ];
        then symbol="\uf244" ; color='%F{red}' ;
    #Less than 25
    fi  
    if [ $(bc <<< "scale=2 ; $percentage>=25") = '1' ] && [ $(bc <<< "scale=2 ; $percentage<50") = '1' ];
        then symbol='\uf243' ; color='%F{red}' ;
    #25%
    fi
    if [ $(bc <<< "scale=2 ; $percentage>=50") = '1' ] && [ $(bc <<< "scale=2 ; $percentage<75") = '1' ];
        then symbol="\uf242" ; color='%F{yellow}' ;
    #50%
    fi
    if [ $(bc <<< "scale=2 ; $percentage>=75") = '1' ] && [ $(bc <<< "scale=2 ; $percentage<100") = '1' ];
        then symbol="\uf241" ; color='%F{green}' ;
    #75%
    fi  
    if [ $(bc <<< "scale=2 ; $percentage>99") = '1' ];
        then symbol="\uf240" ; color='%F{blue}' ;
    #100%
    fi
    pmset -g batt | grep "discharging" >& /dev/null
    if [ $? -eq 0 ]; then
        true;
    else ;
      color='%F{blue}' ;
    fi

    # echo -n "%{$color%}$symbol "'\e[30m''\e[47m''\ue0b4''  '
    echo -n "%{$color%}$symbol "'%{%F{8}%}''%{%K{white}%}''\ue0c0''  '
}
zsh_internet_signal(){
  #source on quality levels - http://www.wireless-nets.com/resources/tutorials/define_SNR_values.html
  #source on signal levels  - http://www.speedguide.net/faq/how-to-read-rssisignal-and-snrnoise-ratings-440
	local signal=$(airport -I | grep agrCtlRSSI | awk '{print $2}' | sed 's/-//g')
  local noise=$(airport -I | grep agrCtlNoise | awk '{print $2}' | sed 's/-//g')
  local SNR=$(bc <<<"scale=2; $signal / $noise")

  local net=$(curl -D- -o /dev/null -s http://www.google.com | grep HTTP/1.1 | awk '{print $2}')
  local color='%F{yellow}'
  local symbol="\uf197"

  # Excellent Signal (5 bars)
  if [[ ! -z "${signal// }" ]] && [[ $SNR -gt .40 ]] ; 
    then color='%F{blue}' ; symbol="\uf1eb" ;
  fi

  # Good Signal (3-4 bars)
  if [[ ! -z "${signal// }" ]] && [[ ! $SNR -gt .40 ]] && [[ $SNR -gt .25 ]] ; 
    then color='%F{green}' ; symbol="\uf1eb" ;
  fi

  # Low Signal (2 bars)
  if [[ ! -z "${signal// }" ]] && [[ ! $SNR -gt .25 ]] && [[ $SNR -gt .15 ]] ; 
    then color='%F{yellow}' ; symbol="\uf1eb" ;
  fi

  # Very Low Signal (1 bar)
  if [[ ! -z "${signal// }" ]] && [[ ! $SNR -gt .15 ]] && [[ $SNR -gt .10 ]] ; 
    then color='%F{red}' ; symbol="\uf1eb" ;
  fi

  # No Signal - No Internet
  if [[ ! -z "${signal// }" ]] && [[ ! $SNR -gt .10 ]] ; 
    then color='%F{red}' ; symbol="\uf011";
  fi

  if [[ -z "${signal// }" ]] && [[ "$net" -ne 200 ]] ; 
    then color='%F{red}' ; symbol="\uf011" ;
  fi

  # Ethernet Connection (no wifi, hardline)
  if [[ -z "${signal// }" ]] && [[ "$net" -eq 200 ]] ; 
    then color='%F{blue}' ; symbol="\uf197" ;
  fi

  # echo -n  '\e[47m''\e[30m''\ue0b6''\e[40m'' '"%{$color%}$symbol " # \f1eb is wifi bars
  # echo -n  '\e[40m\e[37m|\uf284 \ue0b6''\e[47m''  \e[90m''\ue0c2''\e[100m'' '"%{$color%}$symbol " # \f1eb is wifi bars
  echo -n  '%{%K{black}%}%{%F{white}%}<|\ue0b6''%{%K{white}%}''  %{%F{8}%}''\ue0c2''%{%K{8}%}'' '"%{$color%}$symbol " # \f1eb is wifi bars
}

DISABLE_AUTO_TITLE="true"

POWERLEVEL9K_DIR_PATH_SEPARATOR="%F{10}$(echo '\ue0bd ')%F{black}"
# POWERLEVEL9K_DIR_PATH_SEPARATOR="%F{10}$(zsh_toggle)"

POWERLEVEL9K_COMMAND_EXECUTION_TIME_THRESHOLD='0'
POWERLEVEL9K_COMMAND_EXECUTION_TIME_PRECISION='3'

POWERLEVEL9K_COMMAND_EXECUTION_TIME_FOREGROUND='14'
POWERLEVEL9K_COMMAND_EXECUTION_TIME_BACKGROUND='10'

POWERLEVEL9K_SHOW_CHANGESET='true'

# VCS COLORS CUSTOMIZATION
POWERLEVEL9K_VCS_CLEAN_FOREGROUND='14'
POWERLEVEL9K_VCS_CLEAN_BACKGROUND='10'
POWERLEVEL9K_VCS_UNTRACKED_FOREGROUND='black'
POWERLEVEL9K_VCS_UNTRACKED_BACKGROUND='magenta'
POWERLEVEL9K_VCS_MODIFIED_FOREGROUND='white'
POWERLEVEL9K_VCS_MODIFIED_BACKGROUND='8'
# POWERLEVEL9K_VCS_GIT_ICON='\ue0a0'
POWERLEVEL9K_VCS_GIT_ICON='\uf418'
POWERLEVEL9K_VCS_GIT_GITHUB_ICON=''
POWERLEVEL9K_VCS_STAGED_ICON='\u00b1'
POWERLEVEL9K_VCS_UNTRACKED_ICON='\u25CF'
POWERLEVEL9K_VCS_UNSTAGED_ICON='\u00b1'
POWERLEVEL9K_VCS_INCOMING_CHANGES_ICON='\u2193'
POWERLEVEL9K_VCS_OUTGOING_CHANGES_ICON='\u2191'
POWERLEVEL9K_RPROMPT_ON_NEWLINE='true'
POWERLEVEL9K_CUSTOM_NEWLINE="echo -n '\n\n'"

# POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(zsh_party command_execution_time user dir vcs)
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(zsh_party user dir vcs)
# POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status zsh_weather time custom_internet_signal zsh_battery_level)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(command_execution_time status zsh_weather time)

POWERLEVEL9K_CUSTOM_OS_ICON="echo %{%F{blue}%}'\ue0b6''%{%K{blue}%}%{%F{black}%} \uF179' %{%K{black}%}%{%F{blue}%}'\ue0bc' "
POWERLEVEL9K_CUSTOM_OS_ICON_BACKGROUND='black'
POWERLEVEL9K_CUSTOM_OS_ICON_FOREGROUND='black'
POWERLEVEL9K_CUSTOM_INTERNET_SIGNAL="zsh_internet_signal"
POWERLEVEL9K_CUSTOM_NODE_VERSION="echo '\ue718' $(node -v)" # '\ue0c8'"
POWERLEVEL9K_CUSTOM_NODE_VERSION_FOREGROUND='green'
POWERLEVEL9K_CUSTOM_NODE_VERSION_BACKGROUND='black'

POWERLEVEL9K_PROMPT_ON_NEWLINE=true

# POWERLEVEL9K_SHORTEN_STRATEGY="truncate_middle"
POWERLEVEL9K_SHORTEN_STRATEGY="truncate_with_package_name"
# POWERLEVEL9K_SHORTEN_STRATEGY="truncate_from_right"
POWERLEVEL9K_SHORTEN_DELIMITER=""
POWERLEVEL9K_SHORTEN_DIR_LENGTH=1

# POWERLEVEL9K_TIME_FORMAT="%D{\uf017 %I:%M \uf133 %h %d}"
POWERLEVEL9K_TIME_FORMAT="%D{\uf017 %I:%M}" # SEARCH Strftime(3) for format codes

# POWERLEVEL9K_LEFT_SEGMENT_SEPARATOR="\ue0d2\uE0B5"
#  POWERLEVEL9K_LEFT_SEGMENT_SEPARATOR="\ue0b4\uf20e "
# POWERLEVEL9K_LEFT_SEGMENT_SEPARATOR="\ue0b4\uf168"                      # SAUSAGE LOOK!!!
# POWERLEVEL9K_LEFT_SEGMENT_SEPARATOR="\ue0b4 "                            # ROUNDED LOOK
POWERLEVEL9K_LEFT_SEGMENT_SEPARATOR="\ue0bc "                            # SLASH LOOK
# POWERLEVEL9K_LEFT_SEGMENT_SEPARATOR="\ue0c0 "                            # FIREEEE
# POWERLEVEL9K_LEFT_SEGMENT_SEPARATOR="\ue0c4\ue0c6\ue601 "

# POWERLEVEL9K_LEFT_SUBSEGMENT_SEPARATOR="%F{white} \ue0CA\uE0C8 %f"
POWERLEVEL9K_LEFT_SUBSEGMENT_SEPARATOR=""
# POWERLEVEL9K_RIGHT_SEGMENT_SEPARATOR=" \uE0CA" # ??
# POWERLEVEL9K_RIGHT_SEGMENT_SEPARATOR="  \uE0C2" # FIRErrÆ
POWERLEVEL9K_RIGHT_SEGMENT_SEPARATOR="  \ue0ba"
POWERLEVEL9K_RIGHT_SUBSEGMENT_SEPARATOR="\ue0b3\ue0b3"
POWERLEVEL9K_RIGHT_SUBSEGMENT_SEPARATOR=""


POWERLEVEL9K_VCS_GIT_GITLAB_ICON="\uF296 "
POWERLEVEL9K_VCS_BRANCH_ICON="\uF296 "

# POWERLEVEL9K_MULTILINE_FIRST_PROMPT_PREFIX="%F{white}\ue0b6%f"
POWERLEVEL9K_MULTILINE_FIRST_PROMPT_PREFIX=""
POWERLEVEL9K_MULTILINE_LAST_PROMPT_PREFIX="%F{bold} \ue285\ue285 %f"

#  - \ue205
POWERLEVEL9K_APPLE_ICON="\uF179"

POWERLEVEL9K_USER_ICON="%F{red}\uF1D0%f"

POWERLEVEL9K_HOME_ICON='\uf015' # ACTUAL HOME ICON
# POWERLEVEL9K_HOME_ICON='\uf0ac' # EARTH ICON
POWERLEVEL9K_HOME_SUB_ICON='\ue5fe'
POWERLEVEL9K_FOLDER_ICON='\ue615'

POWERLEVEL9K_PROMPT_ADD_NEWLINE=true

ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=5'

bindkey '^[accept' autosuggest-accept

# Automatically cd to if not a valid command
setopt AUTO_CD

# Set alias for directories => ~g == ~/Git
hash -d g=~/Git


alias tfs="chrome 'http://tfsprod.nml.com:8080/tfs/NMCollection/ICO/Monsters%20Inc/_backlogs/taskboard?_a=requirements'"
alias jdk="cd /Library/Java/JavaVirtualMachines/jdk1.8.0_151.jdk/Contents/Home"
alias jre="cd /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin/Contents/Home/"
alias keytool="/Library/Java/JavaVirtualMachines/jdk1.8.0_151.jdk/Contents/Home/bin/keytool"
alias cl="clear"
alias l="colorls"
alias ll="l -la --sd"
alias g="git"
alias gc="git clone"
alias gaa="git add ."
alias gps="git push"
alias gpl="git pull"
alias gcm="git commit -m"
alias gd="git dsf"
alias gst="git status"
alias gf="git fetch"
alias gco="git checkout"
alias gcl="git checkout -- ."
alias go="git open"
alias t="touch"
alias m="mkdir"
alias zshcfg="code ~/.zshrc"
alias emacplay="cd /usr/share/emacs/22.1/lisp/play"

alias show='defaults write com.apple.finder AppleShowAllFiles YES; killall Finder /System/Library/CoreServices/Finder.app'
alias hide='defaults write com.apple.finder AppleShowAllFiles NO; killall Finder /System/Library/CoreServices/Finder.app'

alias spacer="defaults write com.apple.dock persistent-apps -array-add '{tile-data={}; tile-type='spacer-tile';}' && killall Dock"

alias cp="pbcopy"
alias cdir="pwd | cp"

source $(dirname $(gem which colorls))/tab_complete.sh
test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"
