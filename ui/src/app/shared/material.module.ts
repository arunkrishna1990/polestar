import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSortModule,
    MatChipsModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSortModule,
        MatChipsModule,
        MatListModule,
        MatButtonModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule
    ],
    exports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSortModule,
        MatChipsModule,
        MatListModule,
        MatButtonModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule
    ],
    declarations: []
})
export class MaterialModule { }
