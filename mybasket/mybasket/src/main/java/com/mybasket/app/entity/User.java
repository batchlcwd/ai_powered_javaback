package com.mybasket.app.entity;

import com.mybasket.app.security.ROLE;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;


import java.util.*;

@Entity
@Table(name = "my-basket-users")
@SQLDelete(sql = "update `my-basket-users` SET deleted = true WHERE jpa_user_id = ?")
@SQLRestriction("deleted = false")
@Getter
@Setter
public class User  extends  BaseEntity{

    @Id
    @Column(name = "jpa_user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String name;

    @Column(unique = true, length = 100)
    private String email;

    private String password;

    private  boolean enable=true;

    @Enumerated(EnumType.STRING)
    private ROLE role=ROLE.ROLE_NORMAL;

//

//    @
//    private  List<ROLE> roles= new ArrayList<>();
//


    //this field will create new table :
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true


    )
    private Set<Address> addresses = new HashSet<>();

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    private  Set<PaymentMethodInfo> paymentMethodInfos=new LinkedHashSet<>();

}
