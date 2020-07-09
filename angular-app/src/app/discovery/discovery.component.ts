import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})
export class DiscoveryComponent implements OnInit {

  tagOptions: string[] = ['Producer', 'Guitar', 'HipHop', 'Singer', 'Songwriter'];

  constructor() { }

  ngOnInit(): void {
  }

}
