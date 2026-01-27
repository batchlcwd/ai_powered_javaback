package com.mybasket.app.repository;

import com.mybasket.app.entity.FileMetaData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileMetaDataRepo extends JpaRepository<FileMetaData,Long> {
}
