import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {
  @ViewChildren(MatMenuTrigger) public menuTriggers: 
  QueryList<MatMenuTrigger>;  

  public selectedLongListTags: Tag[] = [];
  public tags: Tag[] = [
    { name: 'Producer', selected: false },
    { name: 'Guitar', selected: false },
    { name: 'HipHop', selected: false },
    { name: 'Singer', selected: false },
    { name: 'Songwriter', selected: false },
    { name: 'Pop', selected: false },
    { name: 'Rock', selected: false },
    { name: 'Soul', selected: false },
    { name: 'Drums', selected: false },
    { name: 'R and B', selected: false },
    { name: 'Country', selected: false },
    { name: 'Nineties', selected: false },
    { name: 'Eighties', selected: false },
    { name: 'Trap', selected: false },
    { name: 'Rap', selected: false },
    { name: 'Neo-Soul', selected: false }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public onSelectedOptionsChange() {
    setTimeout(() => {
        this.selectedLongListTags = this.tags.filter(tag => {
            return tag.selected; 
        });
    })
  }

  public closeMenus(): void {
    this.menuTriggers.forEach(item => {
      item.closeMenu();
    });
  }

  public clearSelectedTags(): Tag[] {
    event.stopPropagation();
    return [];
  }

  public getMultiSelectChipName(tags: any[]): string {
    let selectedTag: string;

    if (tags.length === 1) {
      selectedTag = tags[0].name;
    } else if (tags.length > 0) {
      selectedTag = `${tags[0].name} + ${tags.length - 1}`;
    }

    return selectedTag;
  }
}

export interface Tag {
  name: string;
  selected: boolean;
}

