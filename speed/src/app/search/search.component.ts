import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { from } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private filteredCriteria: string;
  public filteredLaunches: any[] = [];
  public filteredLaunchesList: any[];
  public agencies: any[];
  public status: any[];
  public type: any[];
  constructor(private api: ApiService) { }

  ngOnInit() {
    from(this.api.getAgencies()).subscribe(x => this.agencies = x);
    from(this.api.getStatusTypes()).subscribe(x => this.status = x);
    from(this.api.getMissionTypes()).subscribe(x => this.type = x);
  }

  onSearch = (event: string) => {
    if (this.filteredCriteria === 'Estado') {
      const filteredLaunches = this.api.launches.filter(
        l => l.status === this.status.find(s => s.name === event).id
      );
      this.filteredLaunches = filteredLaunches;
    } else if (this.filteredCriteria === 'Agencia') {
      const filteredLaunches = this.api.launches.filter(l =>
        (!isNullOrUndefined(l.rocket) && !isNullOrUndefined(l.rocket.agencies) && l.rocket.agencies.some(n => n.name === event) ||
          l.missions.some(m => !isNullOrUndefined(m.agencies) && m.agencies.some(a => a.name === event)) ||
          l.location.pads.some(p => !isNullOrUndefined(p.agencies) && p.agencies.some(a => a.name === event)))
      );
      this.filteredLaunches = filteredLaunches;
    } else if (this.filteredCriteria === 'Tipo') {
      const filteredLaunches = this.api.launches.filter(l =>
        l.missions.some(n => n.typeName === event)
      );
      this.filteredLaunches = filteredLaunches;
    }
  }

  public onSelectCriteria(event: string) {

    this.filteredCriteria = event;

    if ('Estado' === event) {
      this.filteredLaunchesList = this.status;
    } else if ('Agencia' === event) {
      this.filteredLaunchesList = this.agencies;
    } else if ('Tipo' === event) {
      this.filteredLaunchesList = this.type;
    }

    this.filteredLaunches = [];
  }

}
