package com.mamdaero.domain.counselor_item.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@SQLDelete(sql = "UPDATE counselor_item SET is_delete = true WHERE counselor_item_id = ?")
@Where(clause = "is_delete = false")
@Table(name = "counselor_item")
public class CounselorItem {

    @Id
    @Column(name = "counselor_item_id", updatable = false)
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

    @Column(name = "is_delete")
    @ColumnDefault("false")
    private boolean isDelete;
}
