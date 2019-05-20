execute pathogen#infect()
syntax on
filetype plugin indent on
autocmd vimenter * NERDTree
autocmd vimenter * wincmd p
set number
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
