package com.mamdaero.domain.counselor_item.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "counselor_item")
@Entity
public class CounselorItem {

    @Id
    @Column(name = "counselor_item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long counselorItemId;

    @Column(name = "counselor_id")
    private Long counselorId;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column(nullable = false)
    private int fee;
}
